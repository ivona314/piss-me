//
//  ColorCalibration.hpp
//  reactNativeOpenCvTutorial
//
//  Created by Adrian Žgaljić on 13/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#ifndef ColorCalibration_hpp
#define ColorCalibration_hpp

#include <vector>
#include <stdio.h>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

class HelperMethods {
    
public:
    
    Mat colorCalibrateImage(Mat original, vector<vector<double>> originalColor, vector<vector<double>> measuredColor, int noOfColors);
    /*
    Takes original image and returns color found on a strip
    */
   vector<Point3f> processStripImage(Mat imgOriginal);
  
  Mat drawMarkerCenters(Mat imgGray);
  Mat getEdgeImage(Mat img);
  Mat getStripImageDebug(Mat img);
  Mat getColorSquaresDebug(Mat img);

   
    
private:
  
  /*
   Returns color calibrated image
   */
  Mat colorCalibrateImage(Mat original, vector<vector<double>>calibrationMatrix);
    
  /*
  Gets average values for each color channel
  */
  Point3f getAverageValues(Mat img);
  
  
  /*
   Calculates transformation matrix, given arrays of original and measured colors
   */
 vector<vector<double>> findTransformation(vector<vector<double>> originalColor, vector<vector<double>> measuredColor, int noOfColors);
  
  /*
   Transform each color channer using transformation matrix
   */
  vector<double> transformColor(vector<double> color, vector<vector<double>> transformationMatrix);
  
  vector<double> findMatrixInverse(vector<vector<double>> mat);
  
  /*
   Calculates coefficiants used to find transformation matrix 
   */
  vector<double> getCoefficients(vector<vector<double>> originalColor, vector<vector<double>> trueColor, int rows, int color, int coeffRow);
  
  /*
   Finds centers of 4 circle markers
   */
  vector<Point3f> getMarkerCenters(Mat imgGray);
  
  /*
   Perspective transform image using detected marker centers
   */
  Mat perspectiveTransformImage(Mat img, Point3f topLeft, Point3f topRight, Point3f bottomLeft, Point3f bottomRight);
  
  /*
   Returns only the strip from transformed image
   */
  Mat getStripImage(Mat imgTransformed);
  
  /*
   Retruns vector of colors (point.x=blue, point.y=green, point.z=red) for each sqaure of the strip
   */
  vector<Point3f> getColorSquares(Mat img, vector<vector<double>> calibrationMatrix);
  
  /*
   Returns average color within the circle
   */
  Point3f getMarkerColor(Mat img, Point3f circle);
  
 

  
};
#endif /* ColorCalibration_hpp */
