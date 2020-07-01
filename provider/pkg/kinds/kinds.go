// Copyright 2016-2020, Pulumi Corporation.
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

// *** WARNING: this file was generated by pulumigen. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package kinds

import (
	"strings"

	"k8s.io/apimachinery/pkg/runtime/schema"
)

// Kind maps to the name of a Kubernetes resource Kind.
type Kind string

const (
	APIService                         Kind = "APIService"
	APIServiceList                     Kind = "APIServiceList"
	AuditSink                          Kind = "AuditSink"
	AuditSinkList                      Kind = "AuditSinkList"
	Binding                            Kind = "Binding"
	CSIDriver                          Kind = "CSIDriver"
	CSIDriverList                      Kind = "CSIDriverList"
	CSINode                            Kind = "CSINode"
	CSINodeList                        Kind = "CSINodeList"
	CertificateSigningRequest          Kind = "CertificateSigningRequest"
	CertificateSigningRequestList      Kind = "CertificateSigningRequestList"
	ClusterRole                        Kind = "ClusterRole"
	ClusterRoleBinding                 Kind = "ClusterRoleBinding"
	ClusterRoleBindingList             Kind = "ClusterRoleBindingList"
	ClusterRoleList                    Kind = "ClusterRoleList"
	ComponentStatus                    Kind = "ComponentStatus"
	ComponentStatusList                Kind = "ComponentStatusList"
	ConfigMap                          Kind = "ConfigMap"
	ConfigMapList                      Kind = "ConfigMapList"
	ControllerRevision                 Kind = "ControllerRevision"
	ControllerRevisionList             Kind = "ControllerRevisionList"
	CronJob                            Kind = "CronJob"
	CronJobList                        Kind = "CronJobList"
	CustomResourceDefinition           Kind = "CustomResourceDefinition"
	CustomResourceDefinitionList       Kind = "CustomResourceDefinitionList"
	DaemonSet                          Kind = "DaemonSet"
	DaemonSetList                      Kind = "DaemonSetList"
	Deployment                         Kind = "Deployment"
	DeploymentList                     Kind = "DeploymentList"
	EndpointSlice                      Kind = "EndpointSlice"
	EndpointSliceList                  Kind = "EndpointSliceList"
	Endpoints                          Kind = "Endpoints"
	EndpointsList                      Kind = "EndpointsList"
	Event                              Kind = "Event"
	EventList                          Kind = "EventList"
	FlowSchema                         Kind = "FlowSchema"
	FlowSchemaList                     Kind = "FlowSchemaList"
	HorizontalPodAutoscaler            Kind = "HorizontalPodAutoscaler"
	HorizontalPodAutoscalerList        Kind = "HorizontalPodAutoscalerList"
	Ingress                            Kind = "Ingress"
	IngressClass                       Kind = "IngressClass"
	IngressClassList                   Kind = "IngressClassList"
	IngressList                        Kind = "IngressList"
	Job                                Kind = "Job"
	JobList                            Kind = "JobList"
	Lease                              Kind = "Lease"
	LeaseList                          Kind = "LeaseList"
	LimitRange                         Kind = "LimitRange"
	LimitRangeList                     Kind = "LimitRangeList"
	LocalSubjectAccessReview           Kind = "LocalSubjectAccessReview"
	MutatingWebhookConfiguration       Kind = "MutatingWebhookConfiguration"
	MutatingWebhookConfigurationList   Kind = "MutatingWebhookConfigurationList"
	Namespace                          Kind = "Namespace"
	NamespaceList                      Kind = "NamespaceList"
	NetworkPolicy                      Kind = "NetworkPolicy"
	NetworkPolicyList                  Kind = "NetworkPolicyList"
	Node                               Kind = "Node"
	NodeList                           Kind = "NodeList"
	PersistentVolume                   Kind = "PersistentVolume"
	PersistentVolumeClaim              Kind = "PersistentVolumeClaim"
	PersistentVolumeClaimList          Kind = "PersistentVolumeClaimList"
	PersistentVolumeList               Kind = "PersistentVolumeList"
	Pod                                Kind = "Pod"
	PodDisruptionBudget                Kind = "PodDisruptionBudget"
	PodDisruptionBudgetList            Kind = "PodDisruptionBudgetList"
	PodList                            Kind = "PodList"
	PodPreset                          Kind = "PodPreset"
	PodPresetList                      Kind = "PodPresetList"
	PodSecurityPolicy                  Kind = "PodSecurityPolicy"
	PodSecurityPolicyList              Kind = "PodSecurityPolicyList"
	PodTemplate                        Kind = "PodTemplate"
	PodTemplateList                    Kind = "PodTemplateList"
	PriorityClass                      Kind = "PriorityClass"
	PriorityClassList                  Kind = "PriorityClassList"
	PriorityLevelConfiguration         Kind = "PriorityLevelConfiguration"
	PriorityLevelConfigurationList     Kind = "PriorityLevelConfigurationList"
	ReplicaSet                         Kind = "ReplicaSet"
	ReplicaSetList                     Kind = "ReplicaSetList"
	ReplicationController              Kind = "ReplicationController"
	ReplicationControllerList          Kind = "ReplicationControllerList"
	ResourceQuota                      Kind = "ResourceQuota"
	ResourceQuotaList                  Kind = "ResourceQuotaList"
	Role                               Kind = "Role"
	RoleBinding                        Kind = "RoleBinding"
	RoleBindingList                    Kind = "RoleBindingList"
	RoleList                           Kind = "RoleList"
	RuntimeClass                       Kind = "RuntimeClass"
	RuntimeClassList                   Kind = "RuntimeClassList"
	Secret                             Kind = "Secret"
	SecretList                         Kind = "SecretList"
	SelfSubjectAccessReview            Kind = "SelfSubjectAccessReview"
	SelfSubjectRulesReview             Kind = "SelfSubjectRulesReview"
	Service                            Kind = "Service"
	ServiceAccount                     Kind = "ServiceAccount"
	ServiceAccountList                 Kind = "ServiceAccountList"
	ServiceList                        Kind = "ServiceList"
	StatefulSet                        Kind = "StatefulSet"
	StatefulSetList                    Kind = "StatefulSetList"
	Status                             Kind = "Status"
	StorageClass                       Kind = "StorageClass"
	StorageClassList                   Kind = "StorageClassList"
	SubjectAccessReview                Kind = "SubjectAccessReview"
	TokenRequest                       Kind = "TokenRequest"
	TokenReview                        Kind = "TokenReview"
	ValidatingWebhookConfiguration     Kind = "ValidatingWebhookConfiguration"
	ValidatingWebhookConfigurationList Kind = "ValidatingWebhookConfigurationList"
	VolumeAttachment                   Kind = "VolumeAttachment"
	VolumeAttachmentList               Kind = "VolumeAttachmentList"
)

// Namespaced returns whether known resource Kinds are namespaced. If the Kind is unknown (such as CRD Kinds), the
// known return value will be false, and the namespaced value is unknown. In this case, this information can be
// queried separately from the k8s API server.
func (k Kind) Namespaced() (known bool, namespaced bool) {
	switch k {
	// Note: Use `kubectl api-resources --namespaced=true -o name` to retrieve a list of namespace-scoped resources.
	case Binding,
		ConfigMap,
		ControllerRevision,
		CronJob,
		DaemonSet,
		Deployment,
		Endpoints,
		EndpointSlice,
		Event,
		HorizontalPodAutoscaler,
		Ingress,
		Job,
		Lease,
		LimitRange,
		LocalSubjectAccessReview,
		NetworkPolicy,
		PersistentVolumeClaim,
		Pod,
		PodDisruptionBudget,
		PodTemplate,
		ReplicaSet,
		ReplicationController,
		ResourceQuota,
		Role,
		RoleBinding,
		Secret,
		Service,
		ServiceAccount,
		StatefulSet:
		return true, true
	// Note: Use `kubectl api-resources --namespaced=false -o name` to retrieve a list of cluster-scoped resources.
	case APIService,
		CertificateSigningRequest,
		ClusterRole,
		ClusterRoleBinding,
		ComponentStatus,
		CSIDriver,
		CSINode,
		CustomResourceDefinition,
		IngressClass,
		MutatingWebhookConfiguration,
		Namespace,
		Node,
		PersistentVolume,
		PodSecurityPolicy,
		PriorityClass,
		RuntimeClass,
		SelfSubjectAccessReview,
		SelfSubjectRulesReview,
		StorageClass,
		SubjectAccessReview,
		TokenReview,
		ValidatingWebhookConfiguration,
		VolumeAttachment:
		return true, false
	default:
		return false, false
	}
}

// groupVersion maps to the name of a Kubernetes resource GroupVersion.
type groupVersion string

const (
	AdmissionregistrationV1   groupVersion = "admissionregistration.k8s.io/v1"
	AdmissionregistrationV1B1 groupVersion = "admissionregistration.k8s.io/v1beta1"
	ApiextensionsV1           groupVersion = "apiextensions.k8s.io/v1"
	ApiextensionsV1B1         groupVersion = "apiextensions.k8s.io/v1beta1"
	ApiregistrationV1         groupVersion = "apiregistration.k8s.io/v1"
	ApiregistrationV1B1       groupVersion = "apiregistration.k8s.io/v1beta1"
	AppsV1                    groupVersion = "apps/v1"
	AppsV1B1                  groupVersion = "apps/v1beta1"
	AppsV1B2                  groupVersion = "apps/v1beta2"
	AuditregistrationV1A1     groupVersion = "auditregistration.k8s.io/v1alpha1"
	AuthenticationV1          groupVersion = "authentication.k8s.io/v1"
	AuthenticationV1B1        groupVersion = "authentication.k8s.io/v1beta1"
	AuthorizationV1           groupVersion = "authorization.k8s.io/v1"
	AuthorizationV1B1         groupVersion = "authorization.k8s.io/v1beta1"
	AutoscalingV1             groupVersion = "autoscaling/v1"
	AutoscalingV2B1           groupVersion = "autoscaling/v2beta1"
	AutoscalingV2B2           groupVersion = "autoscaling/v2beta2"
	BatchV1                   groupVersion = "batch/v1"
	BatchV1B1                 groupVersion = "batch/v1beta1"
	BatchV2A1                 groupVersion = "batch/v2alpha1"
	CertificatesV1B1          groupVersion = "certificates.k8s.io/v1beta1"
	CoordinationV1            groupVersion = "coordination.k8s.io/v1"
	CoordinationV1B1          groupVersion = "coordination.k8s.io/v1beta1"
	CoreV1                    groupVersion = "core/v1"
	DiscoveryV1B1             groupVersion = "discovery.k8s.io/v1beta1"
	EventsV1B1                groupVersion = "events.k8s.io/v1beta1"
	ExtensionsV1B1            groupVersion = "extensions/v1beta1"
	FlowcontrolV1A1           groupVersion = "flowcontrol.apiserver.k8s.io/v1alpha1"
	MetaV1                    groupVersion = "meta/v1"
	NetworkingV1              groupVersion = "networking.k8s.io/v1"
	NetworkingV1B1            groupVersion = "networking.k8s.io/v1beta1"
	NodeV1A1                  groupVersion = "node.k8s.io/v1alpha1"
	NodeV1B1                  groupVersion = "node.k8s.io/v1beta1"
	PolicyV1B1                groupVersion = "policy/v1beta1"
	RbacV1                    groupVersion = "rbac.authorization.k8s.io/v1"
	RbacV1A1                  groupVersion = "rbac.authorization.k8s.io/v1alpha1"
	RbacV1B1                  groupVersion = "rbac.authorization.k8s.io/v1beta1"
	SchedulingV1              groupVersion = "scheduling.k8s.io/v1"
	SchedulingV1A1            groupVersion = "scheduling.k8s.io/v1alpha1"
	SchedulingV1B1            groupVersion = "scheduling.k8s.io/v1beta1"
	SettingsV1A1              groupVersion = "settings.k8s.io/v1alpha1"
	StorageV1                 groupVersion = "storage.k8s.io/v1"
	StorageV1A1               groupVersion = "storage.k8s.io/v1alpha1"
	StorageV1B1               groupVersion = "storage.k8s.io/v1beta1"
)

// toGVK is a helper function that converts the internal groupVersion and Kind types to a schema.GroupVersionKind
func toGVK(gv groupVersion, kind Kind) schema.GroupVersionKind {
	parts := strings.Split(string(gv), "/")
	g, v := parts[0], parts[1]

	return schema.GroupVersionKind{
		Group:   g,
		Version: v,
		Kind:    string(kind),
	}
}
