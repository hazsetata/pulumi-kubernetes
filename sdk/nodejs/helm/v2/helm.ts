// Copyright 2016-2019, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// *** WARNING: this file was generated by the Pulumi Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { execSync } from "child_process";
import * as fs from "fs";
import * as nodepath from "path";
import * as shell from "shell-quote";
import * as tmp from "tmp";
import * as path from "../../path";
import { getVersion } from "../../version";
import * as yaml from "../../yaml/index";

interface BaseChartOpts {
    /**
     * The optional kubernetes api versions used for Capabilities.APIVersions.
     */
    apiVersions?: pulumi.Input<pulumi.Input<string>[]>;
    /**
     * The optional namespace to install chart resources into.
     */
    namespace?: pulumi.Input<string>;
    /**
     * Overrides for chart values.
     */
    values?: pulumi.Inputs;
    /**
     * Optional array of transformations to apply to resources that will be created by this chart prior to
     * creation. Allows customization of the chart behaviour without directly modifying the chart itself.
     *
     * @example
     * ```typescript
     * transformations: [
     * (obj: any, opts: pulumi.CustomResourceOptions) => {
     *        if (obj.kind === "Deployment" && obj.metadata.name == "cert-manager") {
     *            opts.aliases = [
     *                "urn:pulumi:dev::example::kubernetes:helm.sh/v2:Chart$kubernetes:apps/v1beta1:Deployment::default/cert-manager",
     *            ];
     *        }
     *
     *        if (obj.metadata) {
     *            obj.metadata.namespace = namespaceName;
     *        } else {
     *            obj.metadata = {namespace: namespaceName};
     *        }
     *    },
     * ]
     * ```
     */
    transformations?: ((o: any, opts: pulumi.CustomResourceOptions) => void)[];

    /**
     * An optional prefix for the auto-generated resource names.
     * Example: A resource created with resourcePrefix="foo" would produce a resource named "foo-resourceName".
     */
    resourcePrefix?: string
}

export interface ChartOpts extends BaseChartOpts {
    /**
     * The repository name of the chart to deploy.
     * Example: "stable"
     */
    repo?: pulumi.Input<string>;

    /**
     * The name of the chart to deploy.  If [repo] is provided, this chart name will be prefixed by the repo name.
     * Example: repo: "stable", chart: "nginx-ingress" -> "stable/nginx-ingress"
     * Example: chart: "stable/nginx-ingress" -> "stable/nginx-ingress"
     */
    chart: pulumi.Input<string>;

    /**
     * The version of the chart to deploy. If not provided, the latest version will be deployed.
     */
    version?: pulumi.Input<string>;

    /**
     * Additional options to customize the fetching of the Helm chart.
     */
    fetchOpts?: pulumi.Input<FetchOpts>;
}

function isChartOpts(o: any): o is ChartOpts {
    return "chart" in o;
}

export interface LocalChartOpts extends BaseChartOpts {
    /**
     * The path to the chart directory which contains the `Chart.yaml` file.
     */
    path: string;
}

function isLocalChartOpts(o: any): o is LocalChartOpts {
    return "path" in o;
}

/**
 * Chart is a component representing a collection of resources described by an arbitrary Helm
 * Chart. The Chart can be fetched from any source that is accessible to the `helm` command
 * line. Values in the `values.yml` file can be overridden using `ChartOpts.values` (equivalent
 * to `--set` or having multiple `values.yml` files). Objects can be transformed arbitrarily by
 * supplying callbacks to `ChartOpts.transformations`.
 *
 * `Chart` does not use Tiller. The Chart specified is copied and expanded locally; the semantics
 * are equivalent to running `helm template` and then using Pulumi to manage the resulting YAML
 * manifests. Any values that would be retrieved in-cluster are assigned fake values, and
 * none of Tiller's server-side validity testing is executed.
 */
export class Chart extends yaml.CollectionComponentResource {
    /**
     * Create an instance of the specified Helm chart.
     * @param releaseName Name of the Chart (e.g., nginx-ingress).
     * @param config Configuration options for the Chart.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(
        releaseName: string,
        config: ChartOpts | LocalChartOpts,
        opts?: pulumi.ComponentResourceOptions
    ) {
        if (config.resourcePrefix !== undefined) {
            releaseName = `${config.resourcePrefix}-${releaseName}`
        }
        super("kubernetes:helm.sh/v2:Chart", releaseName, config, opts);

        const allConfig = pulumi.output(config);
        const configDeps = Array.from(<Set<pulumi.Resource>>(<any>allConfig).resources());

        (<any>allConfig).isKnown.then((isKnown: boolean) => {
            if (!isKnown) {
                // Note that this can only happen during a preview.
                pulumi.log.info("[Can't preview] all chart values must be known ahead of time to generate an accurate preview.", this);
            }
        });

        this.resources = allConfig.apply(cfg => {
            // Create temporary directories and files to hold chart data and override values.
            const overrides = tmp.fileSync({ postfix: ".yaml" });
            const chartDir = tmp.dirSync({ unsafeCleanup: true });

            try {
                let chart: string;
                let defaultValues: string;
                let cmd: string;
                if (isChartOpts(cfg)) {
                    // Fetch chart.
                    if (cfg.repo && cfg.repo.includes("http")) {
                        pulumi.log.error(
                            "`repo` specifies the name of the Helm chart repo. Use `fetchOpts.repo` to specify a URL.", this);
                    }
                    const chartToFetch = cfg.repo ? `${cfg.repo}/${cfg.chart}` : cfg.chart;
                    const fetchOpts = Object.assign({}, cfg.fetchOpts, {
                        destination: chartDir.name,
                        version: cfg.version
                    });
                    fetch(chartToFetch, fetchOpts);
                    const fetchedChartName = fs.readdirSync(chartDir.name).sort()[0];
                    chart = path.quotePath(nodepath.join(chartDir.name, fetchedChartName));
                    defaultValues = path.quotePath(
                        nodepath.join(chartDir.name, fetchedChartName, "values.yaml")
                    );
                } else {
                    chart = cfg.path;
                    defaultValues = path.quotePath(nodepath.join(chart, "values.yaml"));
                }

                // Write overrides file.
                const data = JSON.stringify(cfg.values || {}, undefined, "  ");
                fs.writeFileSync(overrides.name, data);

                // Does not require Tiller. From the `helm template` documentation:
                //
                // >  Render chart templates locally and display the output.
                // >
                // > This does not require Tiller. However, any values that would normally be
                // > looked up or retrieved in-cluster will be faked locally. Additionally, none
                // > of the server-side testing of chart validity (e.g. whether an API is supported)
                // > is done.
                const release = shell.quote([releaseName]);
                const values = path.quotePath(overrides.name);
                const apiVersionsArgs = cfg.apiVersions
                  ? cfg.apiVersions.length > 1
                    ? `--api-versions={${cfg.apiVersions
                        .map(apiVersion => shell.quote([apiVersion]))
                        .join(',')}}`
                    : `--api-versions=${shell.quote(cfg.apiVersions)}`
                  : '';
                const namespaceArg = cfg.namespace
                    ? `--namespace ${shell.quote([cfg.namespace])}`
                    : "";

                // Check the helm version - v2 or v3
                let helmVerCmd = `helm version --short || true`;
                const helmVer = execSync(
                    helmVerCmd,
                    {
                        stdio: ['pipe', 'pipe', 'ignore'], // Suppress tiller version error
                    },
                ).toString();

                // Helm v2 returns version like this:
                // Client: v2.16.7+g5f2584f
                // Helm v3 returns a version like this:
                // v3.1.2+gd878d4d
                // --include-crds is available in helm v3.1+ so check for a regex matching that version
                let r = RegExp('^v3\.[1-9]');
                if (r.test(helmVer)) {
                    cmd = `helm template ${chart} --include-crds --name-template ${release} --values ${defaultValues} --values ${values} ${apiVersionsArgs} ${namespaceArg}`;
                } else {
                    cmd = `helm template ${chart} --name-template ${release} --values ${defaultValues} --values ${values} ${apiVersionsArgs} ${namespaceArg}`;
                }

                const yamlStream = execSync(
                    cmd,
                    {
                        env: {...process.env},
                        maxBuffer: 512 * 1024 * 1024 // 512 MB
                    },
                ).toString();
                return this.parseTemplate(
                    yamlStream, cfg.transformations, cfg.resourcePrefix, configDeps, cfg.namespace);
            } catch (e) {
                // Shed stack trace, only emit the error.
                throw new pulumi.RunError(e.toString());
            } finally {
                // Clean up temporary files and directories.
                chartDir.removeCallback();
                overrides.removeCallback();
            }
        });
    }

    parseTemplate(
        text: string,
        transformations: ((o: any, opts: pulumi.CustomResourceOptions) => void)[] | undefined,
        resourcePrefix: string | undefined,
        dependsOn: pulumi.Resource[],
        defaultNamespace: string | undefined,
    ): pulumi.Output<{ [key: string]: pulumi.CustomResource }> {
        // Rather than using the default provider for the following invoke call, use the version specified
        // in package.json.
        let invokeOpts: pulumi.InvokeOptions = { async: true, version: getVersion() };

        const promise = pulumi.runtime.invoke("kubernetes:yaml:decode", {text, defaultNamespace}, invokeOpts);
        return pulumi.output(promise).apply<{[key: string]: pulumi.CustomResource}>(p => yaml.parse(
            {
                resourcePrefix: resourcePrefix,
                objs: p.result,
                transformations: transformations || [],
            },
            { parent: this, dependsOn: dependsOn }
        ));
    }
}

/**
 * Additional options to customize the fetching of the Helm chart.
 */
export interface FetchOpts {
    /** Specific version of a chart. Without this, the latest version is fetched. */
    version?: pulumi.Input<string>;

    /** Verify certificates of HTTPS-enabled servers using this CA bundle. */
    caFile?: pulumi.Input<string>;

    /** Identify HTTPS client using this SSL certificate file. */
    certFile?: pulumi.Input<string>;

    /** Identify HTTPS client using this SSL key file. */
    keyFile?: pulumi.Input<string>;

    /**
     * Location to write the chart. If this and tardir are specified, tardir is appended to this
     * (default ".").
     */
    destination?: pulumi.Input<string>;

    /** Keyring containing public keys (default "/Users/alex/.gnupg/pubring.gpg"). */
    keyring?: pulumi.Input<string>;

    /** Chart repository password. */
    password?: pulumi.Input<string>;

    /** Chart repository url where to locate the requested chart. */
    repo?: pulumi.Input<string>;

    /**
     * If untar is specified, this flag specifies the name of the directory into which the chart is
     * expanded (default ".").
     */
    untardir?: pulumi.Input<string>;

    /** Chart repository username. */
    username?: pulumi.Input<string>;

    /** Location of your Helm config. Overrides $HELM_HOME (default "/Users/alex/.helm"). */
    home?: pulumi.Input<string>;

    /**
     * Use development versions, too. Equivalent to version '>0.0.0-0'. If --version is set, this is
     * ignored.
     */
    devel?: pulumi.Input<boolean>;

    /** Fetch the provenance file, but don't perform verification. */
    prov?: pulumi.Input<boolean>;

    /** If set to false, will leave the chart as a tarball after downloading. */
    untar?: pulumi.Input<boolean>;

    /** Verify the package against its signature. */
    verify?: pulumi.Input<boolean>;
}

interface ResolvedFetchOpts {
    version?: string;
    caFile?: string;
    certFile?: string;
    keyFile?: string;
    destination?: string;
    keyring?: string;
    password?: string;
    repo?: string;
    untardir?: string;
    username?: string;
    home?: string;
    devel?: boolean;
    prov?: boolean;
    untar?: boolean;
    verify?: boolean;
}

/**
 * Retrieve a package from a package repository, and download it locally.
 *
 * This is useful for fetching packages to inspect, modify, or repackage. It can also be used to
 * perform cryptographic verification of a chart without installing the chart.
 *
 * There are options for unpacking the chart after download. This will create a directory for the
 * chart and uncompress into that directory.
 *
 * If the `verify` option is specified, the requested chart MUST have a provenance file, and MUST
 * pass the verification process. Failure in any part of this will result in an error, and the chart
 * will not be saved locally.
 */
export function fetch(chart: string, opts?: ResolvedFetchOpts) {
    const flags: string[] = [];
    const env: { [key: string]: string | undefined } = {...process.env};
    if (opts !== undefined) {
        // Untar by default.
        if(opts.untar !== false) { flags.push(`--untar`); }

        // Helm v3 removed the `--home` flag, so we must use an env var instead.
        if (opts.home) { env['HELM_HOME'] = path.quotePath(opts.home) }

        // For arguments that are not paths to files, it is sufficient to use shell.quote to quote the arguments.
        // However, for arguments that are actual paths to files we use path.quotePath (note that path here is
        // not the node path builtin module). This ensures proper escaping of paths on Windows.
        if (opts.version !== undefined)     { flags.push(`--version ${shell.quote([opts.version])}`);    }
        if (opts.caFile !== undefined)      { flags.push(`--ca-file ${path.quotePath(opts.caFile)}`);          }
        if (opts.certFile !== undefined)    { flags.push(`--cert-file ${path.quotePath(opts.certFile)}`);      }
        if (opts.keyFile !== undefined)     { flags.push(`--key-file ${path.quotePath(opts.keyFile)}`);        }
        if (opts.destination !== undefined) { flags.push(`--destination ${path.quotePath(opts.destination)}`); }
        if (opts.keyring !== undefined)     { flags.push(`--keyring ${path.quotePath(opts.keyring)}`);         }
        if (opts.password !== undefined)    { flags.push(`--password ${shell.quote([opts.password])}`);  }
        if (opts.repo !== undefined)        { flags.push(`--repo ${path.quotePath(opts.repo)}`);               }
        if (opts.untardir !== undefined)    { flags.push(`--untardir ${path.quotePath(opts.untardir)}`);       }
        if (opts.username !== undefined)    { flags.push(`--username ${shell.quote([opts.username])}`);  }
        if (opts.devel === true)            { flags.push(`--devel`);                                           }
        if (opts.prov === true)             { flags.push(`--prov`);                                            }
        if (opts.verify === true)           { flags.push(`--verify`);                                          }
    }
    execSync(`helm fetch ${shell.quote([chart])} ${flags.join(" ")}`, { env });
}
