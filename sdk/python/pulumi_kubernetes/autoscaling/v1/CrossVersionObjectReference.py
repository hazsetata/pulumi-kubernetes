import pulumi
import pulumi.runtime

from ... import tables

class CrossVersionObjectReference(pulumi.CustomResource):
    """
    CrossVersionObjectReference contains enough information to let you identify the referred
    resource.
    """
    def __init__(self, __name__, __opts__=None, name=None):
        if not __name__:
            raise TypeError('Missing resource name argument (for URN creation)')
        if not isinstance(__name__, str):
            raise TypeError('Expected resource name to be a string')
        if __opts__ and not isinstance(__opts__, pulumi.ResourceOptions):
            raise TypeError('Expected resource options to be a ResourceOptions instance')

        __props__ = dict()

        __props__['apiVersion'] = 'autoscaling/v1'
        __props__['kind'] = 'CrossVersionObjectReference'
        if not name:
            raise TypeError('Missing required property name')
        __props__['name'] = name

        super(CrossVersionObjectReference, self).__init__(
            "kubernetes:autoscaling/v1:CrossVersionObjectReference",
            __name__,
            __props__,
            __opts__)

    def translate_output_property(self, prop: str) -> str:
        return tables._CASING_FORWARD_TABLE.get(prop) or prop

    def translate_input_property(self, prop: str) -> str:
        return tables._CASING_BACKWARD_TABLE.get(prop) or prop