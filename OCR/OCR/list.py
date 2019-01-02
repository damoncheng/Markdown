#coding:utf-8
#!C:\\python27\\python

try:
    import Image
except ImportError:
    from PIL import Image,ImageEnhance,ImageDraw
from pytesseract import *
from xml.dom.minidom import parse, parseString

pytesseract.tesseract_cmd = 'C:\\Program Files (x86)\\Tesseract-OCR\\tesseract'

import os
import sys
import traceback
import httplib
import urllib2
import re
from urllib import urlencode


denoising_times = 5
value_pixel = 5
R,G,B = 0, 1, 2

threshold = 200
table = []    
for i in range(256):    
    if i < threshold:    
        table.append(0)    
    else:    
        table.append(1) 


def saveFile(content, file_name):
    with open(file_name, "w") as f:
        f.write(content)

def saveFile_b(content, file_name):
    with open(file_name, "wb") as f:
        f.write(content)

def data(image, index):
	data = image.getdata()
	return data[index]

def getPixel(image, x, y, N):
    pixel = image.getpixel((x,y))
    
    if pixel == 255:
        return None

    nearDots = 0
    if pixel == image.getpixel((x - 1, y - 1)):
        nearDots += 1
    
    if pixel == image.getpixel((x - 1, y)):
        nearDots += 1

    if pixel == image.getpixel((x - 1, y + 1)):
        nearDots += 1

    if pixel == image.getpixel((x, y + 1)):
        nearDots += 1

    if pixel == image.getpixel((x + 1, y + 1)):
        nearDots += 1

    if pixel == image.getpixel((x + 1, y)):
        nearDots += 1

    if pixel == image.getpixel((x + 1, y - 1)):
        nearDots += 1

    if pixel == image.getpixel((x, y - 1)):
        nearDots += 1


    if nearDots < N:
        return 255

    return None

def clearNoise(image, value_pixel, denoising_times):
    draw = ImageDraw.Draw(image)
    for i in xrange(0,denoising_times):
        for x in xrange(1, image.size[0] - 1):
            for y in xrange(1, image.size[1] - 1):
                color = getPixel(image, x, y, value_pixel)
                if color != None:
                    draw.point((x,y), color)

def getValidcodeText(file_name, subdir=""):
    original_img = Image.open(os.path.join(subdir, file_name))
    img = original_img
    print data(img, 0)
	
    gray_img = original_img.convert('L')
    gray_img.save(os.path.join(subdir, "gray_" + file_name))
    img = gray_img
    print data(img, 0)

    binary_img = gray_img.point(table,'1')
    binary_img.save(os.path.join(subdir, "binary_" + file_name))
    img = binary_img
    print data(img, 0)

    clearNoise(binary_img, 3, denoising_times)
    binary_img.save(os.path.join(subdir, "denoising_binary_" + file_name))
    img = binary_img
    print data(img, 0)

    #data = img.getdata()
    #w,h = img.size
    #print len(data)
    #print data[0]
    #print "w:",w
    #print "h:",h

    return image_to_string(img, config="validcode")


if __name__ == '__main__':
	print getValidcodeText("create.jpg")
