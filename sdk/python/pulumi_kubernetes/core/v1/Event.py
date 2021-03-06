# coding=utf-8
# *** WARNING: this file was generated by pulumigen. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import warnings
import pulumi
import pulumi.runtime
from typing import Any, Dict, List, Mapping, Optional, Tuple, Union
from ... import _utilities, _tables
from . import outputs
from ... import meta as _meta
from ._inputs import *

__all__ = ['Event']


class Event(pulumi.CustomResource):
    def __init__(__self__,
                 resource_name: str,
                 opts: Optional[pulumi.ResourceOptions] = None,
                 action: Optional[pulumi.Input[str]] = None,
                 api_version: Optional[pulumi.Input[str]] = None,
                 count: Optional[pulumi.Input[float]] = None,
                 event_time: Optional[pulumi.Input[str]] = None,
                 first_timestamp: Optional[pulumi.Input[str]] = None,
                 involved_object: Optional[pulumi.Input[pulumi.InputType['ObjectReferenceArgs']]] = None,
                 kind: Optional[pulumi.Input[str]] = None,
                 last_timestamp: Optional[pulumi.Input[str]] = None,
                 message: Optional[pulumi.Input[str]] = None,
                 metadata: Optional[pulumi.Input[pulumi.InputType['_meta.v1.ObjectMetaArgs']]] = None,
                 reason: Optional[pulumi.Input[str]] = None,
                 related: Optional[pulumi.Input[pulumi.InputType['ObjectReferenceArgs']]] = None,
                 reporting_component: Optional[pulumi.Input[str]] = None,
                 reporting_instance: Optional[pulumi.Input[str]] = None,
                 series: Optional[pulumi.Input[pulumi.InputType['EventSeriesArgs']]] = None,
                 source: Optional[pulumi.Input[pulumi.InputType['EventSourceArgs']]] = None,
                 type: Optional[pulumi.Input[str]] = None,
                 __props__=None,
                 __name__=None,
                 __opts__=None):
        """
        Event is a report of an event somewhere in the cluster.

        :param str resource_name: The name of the resource.
        :param pulumi.ResourceOptions opts: Options for the resource.
        :param pulumi.Input[str] action: What action was taken/failed regarding to the Regarding object.
        :param pulumi.Input[str] api_version: APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
        :param pulumi.Input[float] count: The number of times this event has occurred.
        :param pulumi.Input[str] event_time: Time when this Event was first observed.
        :param pulumi.Input[str] first_timestamp: The time at which the event was first recorded. (Time of server receipt is in TypeMeta.)
        :param pulumi.Input[pulumi.InputType['ObjectReferenceArgs']] involved_object: The object that this event is about.
        :param pulumi.Input[str] kind: Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
        :param pulumi.Input[str] last_timestamp: The time at which the most recent occurrence of this event was recorded.
        :param pulumi.Input[str] message: A human-readable description of the status of this operation.
        :param pulumi.Input[pulumi.InputType['_meta.v1.ObjectMetaArgs']] metadata: Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
        :param pulumi.Input[str] reason: This should be a short, machine understandable string that gives the reason for the transition into the object's current status.
        :param pulumi.Input[pulumi.InputType['ObjectReferenceArgs']] related: Optional secondary object for more complex actions.
        :param pulumi.Input[str] reporting_component: Name of the controller that emitted this Event, e.g. `kubernetes.io/kubelet`.
        :param pulumi.Input[str] reporting_instance: ID of the controller instance, e.g. `kubelet-xyzf`.
        :param pulumi.Input[pulumi.InputType['EventSeriesArgs']] series: Data about the Event series this event represents or nil if it's a singleton Event.
        :param pulumi.Input[pulumi.InputType['EventSourceArgs']] source: The component reporting this event. Should be a short machine understandable string.
        :param pulumi.Input[str] type: Type of this event (Normal, Warning), new types could be added in the future
        """
        if __name__ is not None:
            warnings.warn("explicit use of __name__ is deprecated", DeprecationWarning)
            resource_name = __name__
        if __opts__ is not None:
            warnings.warn("explicit use of __opts__ is deprecated, use 'opts' instead", DeprecationWarning)
            opts = __opts__
        if opts is None:
            opts = pulumi.ResourceOptions()
        if not isinstance(opts, pulumi.ResourceOptions):
            raise TypeError('Expected resource options to be a ResourceOptions instance')
        if opts.version is None:
            opts.version = _utilities.get_version()
        if opts.id is None:
            if __props__ is not None:
                raise TypeError('__props__ is only valid when passed in combination with a valid opts.id to get an existing resource')
            __props__ = dict()

            __props__['action'] = action
            __props__['api_version'] = 'v1'
            __props__['count'] = count
            __props__['event_time'] = event_time
            __props__['first_timestamp'] = first_timestamp
            if involved_object is None:
                raise TypeError("Missing required property 'involved_object'")
            __props__['involved_object'] = involved_object
            __props__['kind'] = 'Event'
            __props__['last_timestamp'] = last_timestamp
            __props__['message'] = message
            if metadata is None:
                raise TypeError("Missing required property 'metadata'")
            __props__['metadata'] = metadata
            __props__['reason'] = reason
            __props__['related'] = related
            __props__['reporting_component'] = reporting_component
            __props__['reporting_instance'] = reporting_instance
            __props__['series'] = series
            __props__['source'] = source
            __props__['type'] = type
        alias_opts = pulumi.ResourceOptions(aliases=[pulumi.Alias(type_="kubernetes:events.k8s.io/v1:Event"), pulumi.Alias(type_="kubernetes:events.k8s.io/v1beta1:Event")])
        opts = pulumi.ResourceOptions.merge(opts, alias_opts)
        super(Event, __self__).__init__(
            'kubernetes:core/v1:Event',
            resource_name,
            __props__,
            opts)

    @staticmethod
    def get(resource_name: str,
            id: pulumi.Input[str],
            opts: Optional[pulumi.ResourceOptions] = None) -> 'Event':
        """
        Get an existing Event resource's state with the given name, id, and optional extra
        properties used to qualify the lookup.

        :param str resource_name: The unique name of the resulting resource.
        :param pulumi.Input[str] id: The unique provider ID of the resource to lookup.
        :param pulumi.ResourceOptions opts: Options for the resource.
        """
        opts = pulumi.ResourceOptions.merge(opts, pulumi.ResourceOptions(id=id))

        __props__ = dict()

        return Event(resource_name, opts=opts, __props__=__props__)

    @property
    @pulumi.getter
    def action(self) -> pulumi.Output[Optional[str]]:
        """
        What action was taken/failed regarding to the Regarding object.
        """
        return pulumi.get(self, "action")

    @property
    @pulumi.getter(name="apiVersion")
    def api_version(self) -> pulumi.Output[Optional[str]]:
        """
        APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
        """
        return pulumi.get(self, "api_version")

    @property
    @pulumi.getter
    def count(self) -> pulumi.Output[Optional[float]]:
        """
        The number of times this event has occurred.
        """
        return pulumi.get(self, "count")

    @property
    @pulumi.getter(name="eventTime")
    def event_time(self) -> pulumi.Output[Optional[str]]:
        """
        Time when this Event was first observed.
        """
        return pulumi.get(self, "event_time")

    @property
    @pulumi.getter(name="firstTimestamp")
    def first_timestamp(self) -> pulumi.Output[Optional[str]]:
        """
        The time at which the event was first recorded. (Time of server receipt is in TypeMeta.)
        """
        return pulumi.get(self, "first_timestamp")

    @property
    @pulumi.getter(name="involvedObject")
    def involved_object(self) -> pulumi.Output['outputs.ObjectReference']:
        """
        The object that this event is about.
        """
        return pulumi.get(self, "involved_object")

    @property
    @pulumi.getter
    def kind(self) -> pulumi.Output[Optional[str]]:
        """
        Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
        """
        return pulumi.get(self, "kind")

    @property
    @pulumi.getter(name="lastTimestamp")
    def last_timestamp(self) -> pulumi.Output[Optional[str]]:
        """
        The time at which the most recent occurrence of this event was recorded.
        """
        return pulumi.get(self, "last_timestamp")

    @property
    @pulumi.getter
    def message(self) -> pulumi.Output[Optional[str]]:
        """
        A human-readable description of the status of this operation.
        """
        return pulumi.get(self, "message")

    @property
    @pulumi.getter
    def metadata(self) -> pulumi.Output['_meta.v1.outputs.ObjectMeta']:
        """
        Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
        """
        return pulumi.get(self, "metadata")

    @property
    @pulumi.getter
    def reason(self) -> pulumi.Output[Optional[str]]:
        """
        This should be a short, machine understandable string that gives the reason for the transition into the object's current status.
        """
        return pulumi.get(self, "reason")

    @property
    @pulumi.getter
    def related(self) -> pulumi.Output[Optional['outputs.ObjectReference']]:
        """
        Optional secondary object for more complex actions.
        """
        return pulumi.get(self, "related")

    @property
    @pulumi.getter(name="reportingComponent")
    def reporting_component(self) -> pulumi.Output[Optional[str]]:
        """
        Name of the controller that emitted this Event, e.g. `kubernetes.io/kubelet`.
        """
        return pulumi.get(self, "reporting_component")

    @property
    @pulumi.getter(name="reportingInstance")
    def reporting_instance(self) -> pulumi.Output[Optional[str]]:
        """
        ID of the controller instance, e.g. `kubelet-xyzf`.
        """
        return pulumi.get(self, "reporting_instance")

    @property
    @pulumi.getter
    def series(self) -> pulumi.Output[Optional['outputs.EventSeries']]:
        """
        Data about the Event series this event represents or nil if it's a singleton Event.
        """
        return pulumi.get(self, "series")

    @property
    @pulumi.getter
    def source(self) -> pulumi.Output[Optional['outputs.EventSource']]:
        """
        The component reporting this event. Should be a short machine understandable string.
        """
        return pulumi.get(self, "source")

    @property
    @pulumi.getter
    def type(self) -> pulumi.Output[Optional[str]]:
        """
        Type of this event (Normal, Warning), new types could be added in the future
        """
        return pulumi.get(self, "type")

    def translate_output_property(self, prop):
        return _tables.CAMEL_TO_SNAKE_CASE_TABLE.get(prop) or prop

    def translate_input_property(self, prop):
        return _tables.SNAKE_TO_CAMEL_CASE_TABLE.get(prop) or prop

