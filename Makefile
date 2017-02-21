# Include
include config.mk

## Tasks:
help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

## deploy-npm : Update npm dependences
deploy-npm:
	npm update;

## deploy-bower : Update bower dependence
    deploy-bower: deploy-npm
	./node_modules/.bin/bower update --allow-root;
	rm -rf app/bower_components;
	mv bower_components app;

# Sync prod
sync-prod:
	 rsync -avh ./ ../${PROD_SYNC_FOLDER}/ --delete \
	 --exclude 'node_modules' \
	 --exclude '.git'

## git-checkout-tag : Checkout tag of repository
git-checkout-tag:
	@git fetch --all --tags --prune
	@git tag
	@read -p "Insert tag:" tag; \
	git checkout tags/$$tag

## deploy-prod : Deploy tool for production
deploy-prod: git-checkout-tag
	@rsync -avh ./ ${WORKING_PATH}/${WORKING_DIR} \
     		--delete \
     		--exclude 'node_modules' \
     		--exclude '.git' \
     		--exclude '.idea' \
     		--exclude '.gitignore' \
     		--exclude '.babelrc' \
     		--exclude 'config.mk' \
     		--exclude 'config.mk.dist' \
     		--exclude 'gulpfile.babel.js' \
     		--exclude 'Makefile' \
     		--exclude 'package.json' \
     		--exclude 'README.md'

## dev-start : Start develop workspace
dev-start:
	./node_modules/.bin/gulp serve;
