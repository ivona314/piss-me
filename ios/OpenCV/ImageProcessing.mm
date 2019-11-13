//
//  ImageProcessing.m
//  reactNativeOpenCvTutorial
//
//  Created by Adrian Žgaljić on 26/10/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ImageProcessing.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import "ImageProcessingNative.hpp"
#import "ColorCalibration.hpp"

@implementation ImageProcessing

RCT_EXPORT_MODULE();



RCT_EXPORT_METHOD(checkPixels:(NSString *)imageAsBase64
                  screenHeight:(nonnull NSNumber *)screenHeight
                  screenWidth:(nonnull NSNumber *)screenWidth
                  leftMargin:(nonnull NSNumber *)leftMargin
                  topMargin:(nonnull NSNumber *)topMargin
                  rightMargin:(nonnull NSNumber *)rightMargin
                  bottomMargin:(nonnull NSNumber *)bottomMargin
                  callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"num 1");
  ImageProcessingNative imageProcessingNative;
  ColorCalibration colorCalibration;
  double originalColor[3][3] = {{112, 115, 131},
                         {111, 51, 202},
                         {80, 228, 211}};
  double trueColor[3][3] = {{196, 165, 113},
                            {196, 38, 210},
                            {169, 242, 221}};
  

  UIImage* templateImage = [UIImage imageNamed:@"pm"];
  cv::Mat templateMat = [self convertUIImageToCVMat:templateImage];


  UIImage* image = [self decodeBase64ToImage:imageAsBase64];
  cv::Mat matImage = [self convertUIImageToCVMat:image];
  cv::rotate(matImage, matImage, cv::ROTATE_90_CLOCKWISE);

    
  float widthRatio = matImage.cols/screenWidth.intValue;
  float heightRatio = matImage.rows/screenHeight.intValue;
  int startX = widthRatio*leftMargin.intValue;
  int startY = heightRatio*topMargin.intValue;
  int newWidth = widthRatio*(screenWidth.intValue-leftMargin.intValue- rightMargin.intValue);
  int newHeight = heightRatio*(screenHeight.intValue-topMargin.intValue- bottomMargin.intValue);

  cv::Mat ROI(matImage, cv::Rect(startX, startY, newWidth,newHeight));
  cv::Mat croppedImage;
  ROI.copyTo(croppedImage);
  cv::resize(croppedImage, croppedImage, cv::Size(newWidth/2,newHeight/2));
  cv::cvtColor(croppedImage, croppedImage, CV_RGBA2BGRA);
  UIImage* store1 = [self convertMatToUIImage:croppedImage];
  cv::cvtColor(croppedImage, croppedImage, CV_BGRA2BGR);

  Mat calibratedColors = colorCalibration.colorCalibrateImage(croppedImage, originalColor, trueColor, 3);
  cv::cvtColor(calibratedColors, calibratedColors, CV_BGR2BGRA);

  UIImage* store2 = [self convertMatToUIImage:calibratedColors];
  cv::cvtColor(croppedImage, croppedImage, CV_BGR2BGRA);


  int cols = croppedImage.cols - templateMat.cols + 1;
  int rows = croppedImage.rows - templateMat.rows + 1;
  cv::Mat result = cv::Mat::zeros(cols, rows, CV_32F);
  cv::Mat normalised = cv::Mat::zeros(cols, rows, CV_8UC1);
  NSLog(@"num 3");


  cv::matchTemplate( croppedImage, templateMat, result, CV_TM_SQDIFF);
  //cv::normalize(result, normalised, 0, 255, cv::NORM_MINMAX, -1, cv::Mat());
  NSLog(@"num 4");
  
  
  double minVal;
  double maxVal;
  cv::Point minLoc = cv::Point(10,10);
  cv::Point maxLoc;
  cv::Point matchLoc;
  cv::minMaxLoc(result, &minVal, &maxVal, &minLoc, &maxLoc, cv::Mat() );
  cv::Mat colorMat;
  NSLog(@"num 5");

  

  NSLog(@"num 6");

  NSLog(@"values:: %f %f ---- %i %i", minVal, maxVal, minLoc.x, minLoc.y );

   NSArray *tags =  [NSArray arrayWithObjects:
                        [NSNumber numberWithInteger:minLoc.x],
                        [NSNumber numberWithInteger:minLoc.y],
                        [NSNumber numberWithInteger:2],
                        [NSNumber numberWithInteger:3],
                        [NSNumber numberWithInteger:4],
                        [NSNumber numberWithInteger:5],
                        nil];
  
  callback(@[[NSNull null], tags]);
}


- (UIImage *)decodeBase64ToImage:(NSString *)strEncodeData {
  NSData *data = [[NSData alloc]initWithBase64EncodedString:strEncodeData options:NSDataBase64DecodingIgnoreUnknownCharacters];
  return [UIImage imageWithData:data];
}


- (cv::Mat)convertUIImageToCVMat:(UIImage *)image {
  CGColorSpaceRef colorSpace = CGImageGetColorSpace(image.CGImage);
  CGFloat rows = image.size.width;
  CGFloat cols = image.size.height;
  
  cv::Mat cvMat(rows, cols, CV_8UC4); // 8 bits per component, 4 channels (color channels + alpha)
  
  CGContextRef contextRef = CGBitmapContextCreate(cvMat.data,                 // Pointer to  data
                                                  cols,                       // Width of bitmap
                                                  rows,                       // Height of bitmap
                                                  8,                          // Bits per component
                                                  cvMat.step[0],              // Bytes per row
                                                  colorSpace,                 // Colorspace
                                                  kCGImageAlphaNoneSkipLast |
                                                  kCGBitmapByteOrderDefault); // Bitmap info flags
  
  CGContextDrawImage(contextRef, CGRectMake(0, 0, cols, rows), image.CGImage);
  CGContextRelease(contextRef);
  
  return cvMat;
}

- (UIImage *)convertMatToUIImage:(cv::Mat)cvMat {
  NSData *data = [NSData dataWithBytes:cvMat.data length:cvMat.step.p[0]*cvMat.rows];

    CGColorSpaceRef colorSpace;
    CGBitmapInfo bitmapInfo;

    if (cvMat.elemSize() == 1) {
        colorSpace = CGColorSpaceCreateDeviceGray();
        bitmapInfo = kCGImageAlphaNone | kCGBitmapByteOrderDefault;
    } else {
        colorSpace = CGColorSpaceCreateDeviceRGB();
        // OpenCV defaults to either BGR or ABGR. In CoreGraphics land,
        // this means using the "32Little" byte order, and potentially
        // skipping the first pixel. These may need to be adjusted if the
        // input matrix uses a different pixel format.
        bitmapInfo = kCGBitmapByteOrder32Little | (
            cvMat.elemSize() == 3? kCGImageAlphaNone : kCGImageAlphaNoneSkipFirst
        );
    }

    CGDataProviderRef provider = CGDataProviderCreateWithCFData((__bridge CFDataRef)data);

    // Creating CGImage from cv::Mat
    CGImageRef imageRef = CGImageCreate(
        cvMat.cols,                 //width
        cvMat.rows,                 //height
        8,                          //bits per component
        8 * cvMat.elemSize(),       //bits per pixel
        cvMat.step[0],              //bytesPerRow
        colorSpace,                 //colorspace
        bitmapInfo,                 // bitmap info
        provider,                   //CGDataProviderRef
        NULL,                       //decode
        false,                      //should interpolate
        kCGRenderingIntentDefault   //intent
    );

    // Getting UIImage from CGImage
    UIImage *finalImage = [UIImage imageWithCGImage:imageRef];
    CGImageRelease(imageRef);
    CGDataProviderRelease(provider);
    CGColorSpaceRelease(colorSpace);

    return finalImage;
}


- (cv::Mat)cvMatFromUIImage:(UIImage *)image
{
  CGColorSpaceRef colorSpace = CGImageGetColorSpace(image.CGImage);
  CGFloat cols = image.size.width;
  CGFloat rows = image.size.height;

  cv::Mat cvMat(rows, cols, CV_8UC4); // 8 bits per component, 4 channels (color channels + alpha)

  CGContextRef contextRef = CGBitmapContextCreate(cvMat.data,                 // Pointer to  data
                                                 cols,                       // Width of bitmap
                                                 rows,                       // Height of bitmap
                                                 8,                          // Bits per component
                                                 cvMat.step[0],              // Bytes per row
                                                 colorSpace,                 // Colorspace
                                                 kCGImageAlphaNoneSkipLast |
                                                 kCGBitmapByteOrderDefault); // Bitmap info flags

  CGContextDrawImage(contextRef, CGRectMake(0, 0, cols, rows), image.CGImage);
  CGContextRelease(contextRef);

  return cvMat;
}





@end
