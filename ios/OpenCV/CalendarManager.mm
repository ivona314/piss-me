//
//  CalendarManager.m
//  reactNativeOpenCvTutorial
//
//  Created by Adrian Žgaljić on 26/10/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CalendarManager.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>

@implementation CalendarManager

RCT_EXPORT_MODULE();



RCT_EXPORT_METHOD(checkPixels:(NSString *)imageAsBase64
                  height:(nonnull NSNumber *)height
                  width:(nonnull NSNumber *)width
                  startXScreen:(nonnull NSNumber *)startXScreen
                  startYScreen:(nonnull NSNumber *)startYScreen
                  endXScreen:(nonnull NSNumber *)endXScreen
                  endYScreen:(nonnull NSNumber *)endYScreen
                  callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"num 1");


  NSURL *url = [NSURL URLWithString:@"https://www.shareicon.net/data/128x128/2015/11/08/668660_box_512x512.png"];
  NSData *data = [NSData dataWithContentsOfURL:url];
  UIImage *img = [[[UIImage alloc] initWithData:data] autorelease];
  NSLog(@"num 2");

  UIImage* image = [self decodeBase64ToImage:imageAsBase64];
  cv::Mat matImage = [self convertUIImageToCVMat:image];
  cv::rotate(matImage, matImage, cv::ROTATE_90_CLOCKWISE);

  float widthRatio = matImage.cols/width.intValue;
  float heightRatio = matImage.rows/height.intValue;
  int startX = widthRatio*startXScreen.intValue;
  int startY = heightRatio*startYScreen.intValue;
  int screenWidth = startXScreen.intValue + endXScreen.intValue;
  int screenHeight = startYScreen.intValue + endYScreen.intValue;

  int newWidth = matImage.cols - screenWidth*widthRatio;
  int newHeight = matImage.rows - screenHeight*heightRatio;

  cv::Mat ROI(matImage, cv::Rect(startX, startY, newWidth,newHeight));
  cv::Mat croppedImage;
  ROI.copyTo(croppedImage);
  
  NSLog(@"new size val:%i %i",croppedImage.cols, croppedImage.rows);
  UIImage* newImg = [self convertMatToUIImage:croppedImage];
  UIImageWriteToSavedPhotosAlbum(newImg, nil, nil, nil);
  //cv::resize(matImage, matImage, cv::Size(matImage.cols/10,matImage.rows/10));

  cv::Mat templateImg = [self convertUIImageToCVMat:img];
  int cols = matImage.cols - templateImg.cols + 1;
  int rows = matImage.rows - templateImg.rows + 1;
  cv::Mat result = cv::Mat::zeros(cols, rows, CV_32F);
  cv::Mat normalised = cv::Mat::zeros(cols, rows, CV_8UC1);
  NSLog(@"num 3");


  cv::matchTemplate( matImage, templateImg, result, CV_TM_SQDIFF);

  cv::normalize(result, normalised, 0, 255, cv::NORM_MINMAX, -1, cv::Mat());
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

  NSLog(@"min val:%i %i %i %i min value: %f max value: %f",maxLoc.x, maxLoc.y, minLoc.x, minLoc.y, minVal, maxVal);

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
    NSData *data = [NSData dataWithBytes:cvMat.data length:cvMat.elemSize()*cvMat.total()];

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
