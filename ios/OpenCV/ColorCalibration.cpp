//
//  ColorCalibration.cpp
//  reactNativeOpenCvTutorial
//
//  Created by Adrian Žgaljić on 13/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#include "ColorCalibration.hpp"
using namespace cv;
using namespace std;

Mat ColorCalibration::colorCalibrateImage(Mat original, double originalColor[][3], double measuredColor[][3], int noOfColors){
  double** calibrationMatrix = getTransformationMatrix(originalColor, measuredColor, noOfColors);
  return colorCalibrateImage(original, calibrationMatrix);
}

Mat ColorCalibration::colorCalibrateImage(Mat original, double** calibrationMatrix){
  Mat src = original.clone();
     for (int y = 0; y < src.rows; ++y) {
         uchar *ptr = src.ptr<uchar>(y);
         for (int x = 0; x < src.cols; ++x) {

             double* newValues;
             double b = ptr[x*3];
             double g = ptr[x*3 +1];
             double r = ptr[x*3 +2];

             double color[3] = {b, g, r};
             newValues = transformColor(color, calibrationMatrix);
             for (int i=0; i<3; i++){
                 if (newValues[i] < 0){
                     newValues[i] = 0;
                 } else if (newValues[i] > 255){
                     newValues[i] = 255;
                 }
             }
             
             ptr[x * 3] = static_cast<uchar>(newValues[0]); //blue
             ptr[x * 3 + 1] = static_cast<uchar>(newValues[1]); //green
             ptr[x * 3 + 2] = static_cast<uchar>(newValues[2]); //red
         }
     }

     return src;
}

void ColorCalibration::getAverageValues(Mat img, double values[3]){
     double sumBlue = 0;
     double sumGreen = 0;
     double sumRed = 0;
     double noOfPixels = img.cols * img.rows;
     for (int y = 0; y < img.rows; ++y) {
         uchar *ptr = img.ptr<uchar>(y);
         for (int x = 0; x < img.cols; ++x) {
             sumBlue += ptr[x * 3];
             sumGreen += ptr[x * 3 + 1];
             sumRed += ptr[x * 3 + 2];
         }
     }

     values[0] = sumBlue/noOfPixels;
     values[1] = sumGreen/noOfPixels;
     values[2] = sumRed/noOfPixels;
}

double** ColorCalibration::getTransformationMatrix(double originalColor[][3], double measuredColor[][3], int noOfColors){
  double** transformationMatrix;
  transformationMatrix = new double*[3];
  for (int i = 0; i < noOfColors; i++) {
      transformationMatrix[i] = new double[3];
  }
  double* coeffsBlue;
  double* coeffsGreen;
  double* coeffsRed;
  double* result;
  double newBlue;
  double newGreen;
  double newRed;

  for (int coeffRow=0; coeffRow<3; coeffRow++){
      coeffsBlue = getCoefficients(originalColor, measuredColor, noOfColors, 0, coeffRow);
      coeffsGreen = getCoefficients(originalColor, measuredColor, noOfColors, 1, coeffRow);
      coeffsRed = getCoefficients(originalColor, measuredColor, noOfColors, 2, coeffRow);

      double mat[3][3] = {{coeffsBlue[0], coeffsBlue[1], coeffsBlue[2]},{coeffsGreen[0], coeffsGreen[1], coeffsGreen[2]},{coeffsRed[0], coeffsRed[1], coeffsRed[2]}};
      result = findMatrixInverse(mat);
      newBlue = coeffsBlue[3]*result[0] + coeffsGreen[3]*result[3] + coeffsRed[3]*result[6];
      newGreen = coeffsBlue[3]*result[1] + coeffsGreen[3]*result[4] + coeffsRed[3]*result[7];
      newRed = coeffsBlue[3]*result[2] + coeffsGreen[3]*result[5] + coeffsRed[3]*result[8];
      transformationMatrix[coeffRow][0] = newBlue;
      transformationMatrix[coeffRow][1] = newGreen;
      transformationMatrix[coeffRow][2] = newRed;
  }

  return transformationMatrix;
}

double* ColorCalibration::transformColor(double color[3], double** transformationMatrix){
    double* newColor;
    newColor = new double[3];
    for (int i=0; i<3; i++){
         for (int j=0; j<3; j++){
             newColor[i] += color[j]*transformationMatrix[i][j];
         }
    }
    return newColor;
}

double* ColorCalibration::findMatrixInverse(double mat[3][3]){
  int i, j;

  float determinant = 0;

  for(i = 0; i < 3; i++){
      determinant = determinant + (mat[0][i] * (mat[1][(i+1)%3] * mat[2][(i+2)%3] - mat[1][(i+2)%3] * mat[2][(i+1)%3]));
  }
  double result[3][3];
  for(i = 0; i < 3; i++){
    for(j = 0; j < 3; j++){
          result[i][j] = ((mat[(j+1)%3][(i+1)%3] * mat[(j+2)%3][(i+2)%3]) - (mat[(j+1)%3][(i+2)%3] * mat[(j+2)%3][(i+1)%3]))/ determinant;
    }
  }
  return reinterpret_cast<double *>(result);
}


double* ColorCalibration::getCoefficients(double originalColor[][3], double trueColor[][3], int rows, int color, int coeffRow){
  double a = 0;
  double b = 0;
  double c = 0;
  double d = 0;

  //blue
  if (color == 0) {
      for (int i = 0; i < rows; i++) {
          a += 2 * originalColor[i][0] * originalColor[i][0];
          b += 2 * originalColor[i][0] * originalColor[i][1];
          c += 2 * originalColor[i][0] * originalColor[i][2];
          d += 2 * originalColor[i][0] * trueColor[i][coeffRow];
      }
      //green
  } else if (color == 1){
      for (int i = 0; i < rows; i++) {
          a += 2 * originalColor[i][0] * originalColor[i][1];
          b += 2 * originalColor[i][1] * originalColor[i][1];
          c += 2 * originalColor[i][1] * originalColor[i][2];
          d += 2 * originalColor[i][1] * trueColor[i][coeffRow];
      }
      //red
  } else if (color == 2){
      for (int i = 0; i < rows; i++) {
          a += 2 * originalColor[i][0] * originalColor[i][2];
          b += 2 * originalColor[i][1] * originalColor[i][2];
          c += 2 * originalColor[i][2] * originalColor[i][2];
          d += 2 * originalColor[i][2] * trueColor[i][coeffRow];
      }
  }
  double* result = new double[4]{a, b, c, d};

  return result;
}
