//
//  HelperMethods.cpp
//  reactNativeOpenCvTutorial
//
//  Created by Adrian Žgaljić on 13/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#include "HelperMethods.hpp"
using namespace cv;
using namespace std;

int scalingFactor = 1;

Mat HelperMethods::colorCalibrateImage(Mat original, vector<vector<double>> originalColor, vector<vector<double>> measuredColor, int noOfColors){
  vector<vector<double>> calibrationMatrix = findTransformation(originalColor, measuredColor, noOfColors);
  return colorCalibrateImage(original, calibrationMatrix);
}

Mat HelperMethods::colorCalibrateImage(Mat original, vector<vector<double>> calibrationMatrix){

    Mat src = original.clone();
    for (int y = 0; y < src.rows; ++y) {
        uchar *ptr = src.ptr<uchar>(y);
        for (int x = 0; x < src.cols; ++x) {

            vector<double> newValues;
            double b = ptr[x*3];
            double g = ptr[x*3 +1];
            double r = ptr[x*3 +2];

            vector<double> color{b, g, r};
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

Point3f HelperMethods::getAverageValues(Mat img){
    Point3f colorValues;
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
    colorValues.x = sumBlue/noOfPixels;
    colorValues.y = sumGreen/noOfPixels;
    colorValues.z = sumRed/noOfPixels;
    return colorValues;
}

vector<vector<double>> HelperMethods::findTransformation(vector<vector<double>> originalColor, vector<vector<double>> measuredColor, int noOfColors) {
  vector<vector<double>> transformationMatrix(3,vector<double>(3));

     vector<double> coeffsBlue;
     vector<double> coeffsGreen;
     vector<double> coeffsRed;
     vector<double> result;
     double newBlue;
     double newGreen;
     double newRed;
     for (int coeffRow=0; coeffRow<3; coeffRow++){
        
         coeffsBlue = getCoefficients(originalColor, measuredColor, noOfColors, 0, coeffRow);
         coeffsGreen = getCoefficients(originalColor, measuredColor, noOfColors, 1, coeffRow);
         coeffsRed = getCoefficients(originalColor, measuredColor, noOfColors, 2, coeffRow);

         vector<vector<double>> mat{{coeffsBlue[0], coeffsBlue[1], coeffsBlue[2]},{coeffsGreen[0], coeffsGreen[1], coeffsGreen[2]},{coeffsRed[0], coeffsRed[1], coeffsRed[2]}};
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

vector<double> HelperMethods::transformColor(vector<double> color, vector<vector<double>> transformationMatrix){
    vector<double> newColor(3);
    for (int i=0; i<3; i++){
        for (int j=0; j<3; j++){
            newColor[i] += color[j]*transformationMatrix[i][j];
        }
    }
    return newColor;
}

vector<double> HelperMethods::findMatrixInverse(vector<vector<double>> mat){
    int i, j;

    //finding determinant
    float determinant = 0;

    for(i = 0; i < 3; i++)
        determinant = determinant + (mat[0][i] * (mat[1][(i+1)%3] * mat[2][(i+2)%3] - mat[1][(i+2)%3] * mat[2][(i+1)%3]));


    vector<double> result(9);
    for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++)
            result[3*i+j] = ((mat[(j+1)%3][(i+1)%3] * mat[(j+2)%3][(i+2)%3]) - (mat[(j+1)%3][(i+2)%3] * mat[(j+2)%3][(i+1)%3]))/ determinant;
    }


    return result;
}


vector<double> HelperMethods::getCoefficients(vector<vector<double>> originalColor, vector<vector<double>> trueColor, int rows, int color, int coeffRow){
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
    vector<double> result{a, b, c, d};

    return result;
}

Mat HelperMethods::drawMarkerCenters(Mat imgGray){
  cvtColor(imgGray, imgGray, COLOR_BGR2GRAY);

vector<Point3f> result;
GaussianBlur(imgGray, imgGray, Size(9, 9), 2, 2 );
vector<Vec3f> circles;
HoughCircles(imgGray, circles, HOUGH_GRADIENT, 1, 200/scalingFactor, 40, 30, 20/scalingFactor, 50/scalingFactor);

Point3f topLeft, topRight, bottomLeft, bottomRight;
vector<float> xPoints;
vector<float> yPoints;

  for( size_t i = 0; i < circles.size(); i++ ){
      Point center(cvRound(circles[i][0]), cvRound(circles[i][1]));
      int radius = cvRound(circles[i][2]);
      circle( imgGray, center, radius, Scalar(255), 3, 8, 0 );
  }
  return imgGray;

}

vector<Point3f> HelperMethods::getMarkerCenters(Mat imgGray){
   
    vector<Point3f> result;
    GaussianBlur(imgGray, imgGray, Size(9, 9), 2, 2 );
    vector<Vec3f> circles;
    HoughCircles(imgGray, circles, HOUGH_GRADIENT, 1, 160/scalingFactor, 40, 30, 25/scalingFactor, 50/scalingFactor);

    Point3f topLeft, topRight, bottomLeft, bottomRight;
    vector<float> xPoints;
    vector<float> yPoints;
    


    for( size_t i = 0; i < circles.size(); i++ )
    {
        Point center(cvRound(circles[i][0]), cvRound(circles[i][1]));
        int radius = cvRound(circles[i][2]);
        circle( imgGray, center, radius, Scalar(255), 3, 8, 0 );
    }

    if (circles.size() == 4) {
        for (int i = 0; i < circles.size(); i++) {
            xPoints.push_back(cvRound(circles[i][0]));
            yPoints.push_back(cvRound(circles[i][1]));
        }

        sort(xPoints.begin(), xPoints.end());
        sort(yPoints.begin(), yPoints.end());


        for (int i = 0; i < circles.size(); i++) {
            Point3f center(cvRound(circles[i][0]), cvRound(circles[i][1]), cvRound(circles[i][2]));
            if (center.x == xPoints.at(0) || center.x == xPoints.at(1)) {
                if (center.y == yPoints.at(0) || center.y == yPoints.at(1)) {
                    topLeft = center;
                } else {
                    bottomLeft = center;
                }
            } else {
                if (center.y == yPoints.at(0) || center.y == yPoints.at(1)) {
                    topRight = center;
                } else {
                    bottomRight = center;
                }
            }
        }
        result.push_back(topLeft);
        result.push_back(topRight);
        result.push_back(bottomLeft);
        result.push_back(bottomRight);

        cout << "top left:" << topLeft.x << "," << topLeft.y << endl;
        cout << "top right:" << topRight.x << "," << topRight.y << endl;
        cout << "bottom left:" << bottomLeft.x << "," << bottomLeft.y << endl;
        cout << "bottom right:" << bottomRight.x << "," << bottomRight.y << endl;

    } else {
        cout << "Found " << circles.size() << " circles!" << endl;
    }

    return result;
}


Mat HelperMethods::perspectiveTransformImage(Mat img, Point3f topLeft, Point3f topRight, Point3f bottomLeft, Point3f bottomRight){
    topLeft.y = topLeft.y - 110/scalingFactor;
    topRight.y = topRight.y - 110/scalingFactor;
    bottomLeft.y = bottomLeft.y + 20/scalingFactor;
    bottomRight.y = bottomRight.y + 20/scalingFactor;
    int width = topRight.x - topLeft.x;
    int height = bottomLeft.y - topLeft.y;

    Point2f inputQuad[4];
    inputQuad[0] = Point2f(topLeft.x, topLeft.y);
    inputQuad[1] = Point2f(topRight.x, topRight.y);
    inputQuad[2] = Point2f(bottomLeft.x, bottomLeft.y);
    inputQuad[3] = Point2f(bottomRight.x, bottomRight.y);

    Point2f outputQuad[4];
    outputQuad[0] = Point2f(0,0);
    outputQuad[1] = Point2f(width,0);
    outputQuad[2] = Point2f(0,height);
    outputQuad[3] = Point2f(width,height);

    Mat lambda( 2, 4, CV_32FC1 );
    lambda = getPerspectiveTransform(inputQuad, outputQuad);
    Mat persepectiveTransformedImage(height, width, CV_8UC3);
    warpPerspective(img,persepectiveTransformedImage,lambda,persepectiveTransformedImage.size());
    return  persepectiveTransformedImage;
}

Mat HelperMethods::getEdgeImage(Mat imgTransformed){
  Mat imgGrayTransformed;
  cvtColor(imgTransformed, imgGrayTransformed, COLOR_BGR2GRAY);
  //threshold(imgGrayTransformed, imgGrayTransformed, 40, 255, THRESH_BINARY );

  Mat edges;
  Canny(imgGrayTransformed, edges, 50, 50, 3);
  return edges;
}
Mat HelperMethods::getStripImage(Mat imgTransformed){
  Mat imgGrayTransformed;
  cvtColor(imgTransformed, imgGrayTransformed, COLOR_BGR2GRAY);
  //threshold(imgGrayTransformed, imgGrayTransformed, 40, 255, THRESH_BINARY );

  Mat edges;
  Canny(imgGrayTransformed, edges, 50, 50, 3);
  vector<Vec2f> lines;
  //shoud find better formula for defining threshold
  HoughLines(edges, lines, 1, CV_PI/180, 250-scalingFactor*30, 0, 0 );
  float averageRho1 = 0;
  float averageRho2  = 0;
  int sum1 = 1;
  int sum2 = 1;
  cout << "Found " << lines.size() << " lines." << endl;
  for( size_t i = 0; i < lines.size(); i++ )
  {
      float rho = lines[i][0];
      if (averageRho1 == 0){
          averageRho1 = abs(rho);
      } else if (averageRho2 == 0){
          if (abs(averageRho1/sum1-abs(rho)) < 30/scalingFactor){
              averageRho1 += abs(rho);
              sum1++;
          } else {
              averageRho2 += abs(rho);
          }
      }
      if (abs(averageRho1/sum1-abs(rho)) < 30/scalingFactor){
          averageRho1 += abs(rho);
          sum1++;
      } else {
          averageRho2 += abs(rho);
          sum2++;
      }
  }
  float rho1 = averageRho1/sum1;
  float rho2 = averageRho2/sum2;

  cout << "rho1:" << rho1 << endl;
  cout << "rho2:" << rho2 << endl;
  
  Mat result;
  if (rho1 < rho2){
      Rect newROI(rho1, 0, rho2-rho1,imgGrayTransformed.rows);
      result = imgTransformed(newROI);
  } else {
      Rect newROI(rho2, 0, rho1-rho2,imgGrayTransformed.rows);
      result = imgTransformed(newROI);
  }
  return result;
}

vector<Point3f> HelperMethods::getColorSquares(Mat img, vector<vector<double>> calibrationMatrix){
  vector<Point3f> result;
  int noOfColors = 12;
  float partHeight = img.rows/12;
  float ratio = 50.0/63;
  float squareHeight = ratio * partHeight;
  float spaceHeight = partHeight - squareHeight;
  int squareOffset = 1/scalingFactor;
  cout << "cols:" << img.cols << endl;
  for (int i=0; i<12; i++){
    cout << "size: " <<  i*partHeight +squareHeight << endl;
      Mat imgSquare = img(Rect(squareOffset, i*partHeight+squareOffset, img.cols-squareOffset, squareHeight-squareOffset));
      //Mat calibrated = colorCalibrateImage(imgSquare, calibrationMatrix);
      //result.push_back(getAverageValues(calibrated));
    result.push_back(getAverageValues(imgSquare));

      rectangle(img, Point2f(squareOffset, i*partHeight+squareOffset), Point2f(img.cols-squareOffset, i*partHeight+squareHeight-squareOffset), cv::Scalar(0, 0, 255), 2);
  }
  return result;
}

Point3f HelperMethods::getMarkerColor(Mat img, Point3f circle){
    Point3f colorValues;
    double sumBlue = 0;
    double sumGreen = 0;
    double sumRed = 0;
    double noOfPixels = 0;
    float cX = circle.x;
    float cY = circle.y;
    int r = circle.z-circle.z/10;
    for (int y = cY-r; y < cY+r; y++) {
        uchar *ptr = img.ptr<uchar>(y);
        for (int x = cX-r; x < cX+r; x++) {
            if (((cX-x)*(cX-x)+(cY-y)*(cY-y)) < r*r){
                sumBlue += ptr[x * 3];
                sumGreen += ptr[x * 3 + 1];
                sumRed += ptr[x * 3 + 2];
                noOfPixels++;
            }

        }
    }
    colorValues.x = sumBlue/noOfPixels;
    colorValues.y = sumGreen/noOfPixels;
    colorValues.z = sumRed/noOfPixels;
    return colorValues;

}


vector<Point3f> HelperMethods::processStripImage(Mat imgOriginal){
    cout << "Processing image" << endl;
    Mat img;
    resize(imgOriginal, img, cv::Size(), 1.0/scalingFactor, 1.0/scalingFactor);
    Mat imgGray;
    vector<Point3f> colorValues;
    cvtColor(img, imgGray, COLOR_BGR2GRAY);
    cout << "Image converted to gray" << endl;
    vector<Point3f> markerCenters = getMarkerCenters(imgGray);
    if (markerCenters.size()==4) {
      
        Point3f topLeft, topRight, bottomLeft, bottomRight;
        Point3f topLeftColor, topRightColor, bottomLeftColor, bottomRightColor;
        Point3f topLeftColorCalibrated, topRightColorCalibrated, bottomLeftColorCalibrated, bottomRightColorCalibrated;

        topLeft = markerCenters.at(0);
        topRight = markerCenters.at(1);
        bottomLeft = markerCenters.at(2);
        bottomRight = markerCenters.at(3);

        topLeftColor = getMarkerColor(img, topLeft);
        topRightColor = getMarkerColor(img, topRight);
        bottomLeftColor = getMarkerColor(img, bottomLeft);
        bottomRightColor = getMarkerColor(img, bottomRight);

        vector<vector<double>> colorsMeasured{{topLeftColor.x,topLeftColor.y, topLeftColor.z},
                                       {topRightColor.x, topRightColor.y, topRightColor.z},
                                       {bottomLeftColor.x, bottomLeftColor.y, bottomLeftColor.z},
                                       {bottomRightColor.x, bottomRightColor.y, bottomRightColor.z},
                                       {18, 23, 26}};


        vector<vector<double>> colorsOriginal{{0, 155, 255},
                                       {255, 155, 0},
                                       {0, 255, 255},
                                        {0, 255, 0},
                                       {0, 0, 0}};

        vector<vector<double>> transformation = findTransformation(colorsMeasured,colorsOriginal, 5);
        cout << "Found transformation matrix" << endl;
        Mat imgTransformed = perspectiveTransformImage(img.clone(), topLeft, topRight, bottomLeft, bottomRight);
        cout << "Image is transformed" << endl;
        Mat imgStrip = getStripImage(imgTransformed.clone());
        cout << "Strip is extracted from the image, size: " << imgStrip.cols << "," << imgStrip.rows << endl;
        if (imgStrip.cols > 40/scalingFactor){
          cout << "Color values are found" << endl;
          colorValues = getColorSquares(imgStrip, transformation);
        } else {
          cout << "Color values NOT FOUND" << endl;
        }
        
    }
    return colorValues;
}

Mat HelperMethods::getStripImageDebug(Mat imgOriginal){
  
  cout << "Processing image" << endl;
  Mat img;
  resize(imgOriginal, img, cv::Size(), 1.0/scalingFactor, 1.0/scalingFactor);
  Mat imgGray;
  Mat imgStrip;
  cvtColor(img, imgGray, COLOR_BGR2GRAY);
  cout << "Image converted to gray" << endl;
  vector<Point3f> markerCenters = getMarkerCenters(imgGray);
  if (markerCenters.size()==4) {
    
      Point3f topLeft, topRight, bottomLeft, bottomRight;
      Point3f topLeftColor, topRightColor, bottomLeftColor, bottomRightColor;
      Point3f topLeftColorCalibrated, topRightColorCalibrated, bottomLeftColorCalibrated, bottomRightColorCalibrated;

      topLeft = markerCenters.at(0);
      topRight = markerCenters.at(1);
      bottomLeft = markerCenters.at(2);
      bottomRight = markerCenters.at(3);

      topLeftColor = getMarkerColor(img, topLeft);
      topRightColor = getMarkerColor(img, topRight);
      bottomLeftColor = getMarkerColor(img, bottomLeft);
      bottomRightColor = getMarkerColor(img, bottomRight);

      vector<vector<double>> colorsMeasured{{topLeftColor.x,topLeftColor.y, topLeftColor.z},
                                     {topRightColor.x, topRightColor.y, topRightColor.z},
                                     {bottomLeftColor.x, bottomLeftColor.y, bottomLeftColor.z},
                                     {bottomRightColor.x, bottomRightColor.y, bottomRightColor.z},
                                     {18, 23, 26}};


      vector<vector<double>> colorsOriginal{{0, 155, 255},
                                     {255, 155, 0},
                                     {0, 255, 255},
                                      {0, 255, 0},
                                     {0, 0, 0}};

      vector<vector<double>> transformation = findTransformation(colorsMeasured,colorsOriginal, 5);
      cout << "Found transformation matrix" << endl;
      Mat imgTransformed = perspectiveTransformImage(img.clone(), topLeft, topRight, bottomLeft, bottomRight);
      cout << "Image is transformed" << endl;
      imgStrip = getStripImage(imgTransformed.clone());
     
      
  }
  return imgStrip;
}
