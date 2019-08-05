FROM ubuntu:12.04

# Usage: File Author/Maintainer
MAINTAINER vlead-systems "systems@vlabs.ac.in"

#Usage: Setting proxy environment
#ENV http_proxy "http://proxy.iiit.ac.in:8080"
#ENV https_proxy "http://proxy.iiit.ac.in:8080"

# Usage: Updating system
RUN apt-get update

# Usage: Installing dependencies for computer graphics lab
RUN apt-get install -y git make php5 apache2 net-tools sudo wget libapache2-mod-php5 libcv-dev libcv2.3 libcvaux-dev libcvaux2.3 libhighgui-dev \
    libhighgui2.3 libopencv-calib3d-dev libopencv-calib3d2.3 libopencv-contrib-dev libopencv-contrib2.3 libopencv-core-dev libopencv-core2.3 libopencv-dev \
    libopencv-features2d-dev libopencv-features2d2.3 libopencv-flann-dev \
    libopencv-flann2.3 libopencv-gpu-dev libopencv-gpu2.3 libopencv-highgui-dev \
    libopencv-highgui2.3 libopencv-imgproc-dev libopencv-imgproc2.3 \
    libopencv-legacy-dev libopencv-legacy2.3 libopencv-ml-dev libopencv-ml2.3 \
    libopencv-objdetect-dev libopencv-objdetect2.3 libopencv-video-dev libopencv-video2.3 opencv-doc python-opencv

RUN mkdir /image-processing-iiith

COPY src/ /image-processing-iiith/src

WORKDIR ./image-processing-iiith/src

#Usage: Running make
RUN make

#Usage: Copying lab sources into web server path
RUN rm -rf /var/www/*
RUN cp -r ../build/* /var/www/

EXPOSE 80
EXPOSE 443

#Usage: Setting permissions in /var/www
RUN chmod -R 755 /var/www/*

CMD /usr/sbin/apache2ctl -D FOREGROUND
