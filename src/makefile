build-dir=../build
lib-dir=lib
build-js-dir=${build-dir}/js

theme=green-icon


all:  build install

build:
	
	(mkdir ${build-dir})
	(touch ${build-dir}/theme-${theme}; rsync -avC --exclude ${mathjax}.zip lab/* lib/* help themes/${theme}/* ${build-dir})
	#(chmod 777 -R ${build-dir}/temp ${build-dir}/images  ${build-dir}/arith)
	#FIXME: should not happen in build directory, should change mode to 777 in deplyment directory!
	#(chmod -R 777 ${build-dir}/)


install:
	rm -rf /var/www/*
	sudo rsync -avz ${build-dir}/ /var/www/
	chmod -R 777 /var/www/*


# don't remove the js directory, since copying it again with mathjax takes too long.
# http://superuser.com/questions/168130/unix-delete-files-and-folders-excluding-pattern
clean:
	(rm -rf ${build-dir})









