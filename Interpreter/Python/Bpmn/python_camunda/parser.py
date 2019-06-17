#coding:utf-8

from xml.dom.minidom import parse, parseString
from descriptor.qflow import qflow_descriptor


class Camunda(object):

    def __init__(self, desc):

        self._desc = desc;
        self._shape_category_dict = {}

        for one_shape in qflow_descriptor["shape"]:

            self._shape_category_dict[one_shape["type"]] = one_shape["category"]

    def is_shape_element(self, node):

        return (node.tagName in self._shape_category_dict)

    def is_connection_element(self, node):

        return (node.tagName == self._desc["connection"]["type"])

    def is_valid_element(self, node):

        return (node.nodeType == node.ELEMENT_NODE) and \
           (
             self.is_shape_element(node) or
             self.is_connection_element(node)
           )          

    def fill_shape_field(self, element_dict, node):

        id = node.getAttribute("id")

        field_node_list = node.getElementsByTagName(self._desc["content"]["type"])

        for one_field_node in field_node_list:

            field_dict = {}

            for one_field_attr in self._desc["content"]["attrs"]:

                attr_name = one_field_attr["replace"] if("replace" in one_field_attr) else one_field_attr["name"]

                field_dict[one_field_attr["name"]] = one_field_node.getAttribute(attr_name) or one_field_attr["default"]


            element_dict["steps"][id]["fields"].append(field_dict)


    def fill_shape_attr(self, element_dict, node):

        id = node.getAttribute("id")
        element_dict["steps"][id] = {"fields" : []}

        for attr_dict in self._desc["attrs"]:

            attr_name = attr_dict["replace"] if("replace" in attr_dict) else attr_dict["name"]

            element_dict["steps"][id][attr_dict["name"]] = node.getAttribute(attr_name) or attr_dict["default"]

    def parse_shape(self, element_dict, node):

        if self._shape_category_dict[node.tagName] == "start":

            element_dict["start"] = node.getAttribute("id")

        else:

            self.fill_shape_attr(element_dict, node)
            self.fill_shape_field(element_dict, node)

    def parse_connection(self, element_dict, node):

        source_ref = node.getAttribute("sourceRef")
        target_ref = node.getAttribute("targetRef")

        element_dict["relations"].append([source_ref, target_ref])

    def parse_node(self, element_dict, node):

        if self.is_shape_element(node):

            self.parse_shape(element_dict, node)

        elif self.is_connection_element(node):

            self.parse_connection(element_dict, node)

    def get_elements(self, xml_string):

        element_dict = {

            "start" : None,
            "steps" : {},
            "relations" : []
                
        }

        model = parseString(xml_string)

        bpmn_process = model.getElementsByTagName("bpmn2:process")[0]

        node_list = bpmn_process.childNodes

        for one_node in node_list:

            if self.is_valid_element(one_node):

                self.parse_node(element_dict, one_node)

        return element_dict


if __name__ == "__main__":

    dom = parse("./resource/diagram.bpmn")
    model = dom.toxml("utf-8")

    camunda = Camunda(qflow_descriptor)

    element_dict = camunda.get_elements(model)

    print "element_dict : ", element_dict




