PROD_SYNC_FOLDER = wedive-client-sync

# Deploy npm dependence
deploy-npm:
	npm update;

# Deploy bower dependence
    deploy-bower: deploy-npm
	./node_modules/.bin/bower update --allow-root;
	rm -rf app/bower_components;
	mv bower_components app;

# Sync prod 
sync-prod:
	 rsync -avh ./ ../${PROD_SYNC_FOLDER}/ --delete \
	 --exclude 'node_modules' \
	 --exclude '.git'

# TODO deploy tag

# Start develop workspace
dev-start:
	./node_modules/.bin/gulp serve;

