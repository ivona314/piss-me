//
//  ColorCalibration.hpp
//  reactNativeOpenCvTutorial
//
//  Created by Adrian Žgaljić on 13/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef ColorCalibration_hpp
#define ColorCalibration_hpp

#include <stdio.h>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

class ColorCalibration {
    
public:
    
    Mat colorCalibrateImage(Mat original, double originalColor[][3], double measuredColor[][3], int noOfColors);

    
private:
  
  /*
   Returns color calibrated image
   */
  Mat colorCalibrateImage(Mat original, double** calibrationMatrix);
    
  /*
  Gets average values for each color channel
  */
  void getAverageValues(Mat img, double values[3]);
  
  
  /*
   Calculates transformation matrix, given arrays of original and measured colors
   */
  double** getTransformationMatrix(double originalColor[][3], double measuredColor[][3], int noOfColors);
  
  /*
   Transform each color channer using transformation matrix
   */
  double* transformColor(double color[3], double** transformationMatrix);
  
  double* findMatrixInverse(double mat[3][3]);
  
  /*
   Calculates coefficiants used to find transformation matrix 
   */
  double* getCoefficients(double originalColor[][3], double trueColor[][3], int rows, int color, int coeffRow);
};
#endif /* ColorCalibration_hpp */
