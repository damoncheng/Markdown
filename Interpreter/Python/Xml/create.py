from io import BytesIO
import xml.etree.ElementTree as ET

root = ET.Element(None)

definition = ET.SubElement(root, 'bpmn2:definitions')
definition.set("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
definition.set("xmlns:bpmn2", "http://www.omg.org/spec/BPMN/20100524/MODEL")
definition.set("xmlns:bpmndi", "http://www.omg.org/spec/BPMN/20100524/DI")
definition.set("xmlns:dc", "http://www.omg.org/spec/DD/20100524/DC")
definition.set("xmlns:di", "http://www.omg.org/spec/DD/20100524/DI")
definition.set("xmlns:qflow", "http://qflow.oa.com")
definition.set("id", "sample-diagram")
definition.set("targetNamespace", "http://bpmn.io/schema/bpmn")
definition.set("xsi:schemaLocation", "http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd")

process = ET.SubElement(definition, 'bpmn2:process')
process.set("id", "Process_1")
process.set("isExecutable", "false")

et = ET.ElementTree(root)
f = BytesIO()
et.write(f, encoding='utf-8', xml_declaration=True) 

print (f.getvalue())

