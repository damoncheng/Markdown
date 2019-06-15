#coding:utf-8

from xml.dom.minidom import parse, parseString
from descriptor.qflow import qflow_descriptor


class Camunda(object):

    def __init__(self, desc):

        self._desc = desc;

    def get_elements(self, xml_string):

        model = parseString(xml_string)

        bpmn_process = model.getElementsByTagName("bpmn2:process")[0]

        print("bpmn_process : ", bpmn_process.toxml())

        


if __name__ == "__main__":

    dom = parse("./resource/diagram.bpmn")
    model = dom.toxml("utf-8")

    camunda = Camunda(qflow_descriptor)

    camunda.get_elements(model)




