//
//  ImageProcessingNative.hpp
//  reactNativeOpenCvTutorial
//
//  Created by Adrian Žgaljić on 13/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef ImageProcessingNative_hpp
#define ImageProcessingNative_hpp

#include <stdio.h>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

class ImageProcessingNative {
    
public:
    
    /*
     Returns image with lane overlay
     */
    Mat detect_lane(Mat image);
    
private:
    
    /*
     Filters yellow and white colors on image
     */
    Mat filter_only_yellow_white(Mat image);
    
    /*
     Crops region where lane is most likely to be.
     Maintains image original size with the rest of the image blackened out.
     */
    Mat crop_region_of_interest(Mat image);
    
    /*
     Draws road lane on top image
     */
    Mat draw_lines(Mat image, vector<Vec4i> lines);
    
    /*
     Detects road lanes edges
     */
    Mat detect_edges(Mat image);
};
#endif /* ImageProcessingNative_hpp */
