#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <opencv2/imgproc/imgproc.hpp>
#import <opencv2/objdetect/objdetect_c.h>
@interface RNOpenCvLibrary : NSObject <RCTBridgeModule>

@end

