include .env

.PHONY: announce-env sync-shared dump-db sync-db sync-shared-staging sync-shared-production \
 sync-db-staging sync-db-production all-production all-staging

announce-env:
	@echo "\033[1;34mEnvironment: $(STAGE)\033[0m"
	@echo ""

sync-shared:
	@echo "Syncing shared folder for $(STAGE)..."
	rsync -av -e "ssh ${HETZNER}" $($(STAGE)_PROJECT_HOST):$($(STAGE)_PROJECT_PATH)/shared/* ./shared/
	@echo "Synced shared folder for $(STAGE)"

dump-db:
	@echo "Dumping $(TYPO3_DB_NAME_$(STAGE)) database..."
	@ssh $($(STAGE)_PROJECT_HOST) ${HETZNER} "mysqldump -h $(TYPO3_DB_HOST_$(STAGE)) -u $(TYPO3_DB_USER_$(STAGE)) -p$(TYPO3_DB_PASSWORD_$(STAGE)) $(TYPO3_DB_NAME_$(STAGE))" > ./shared/db_export_$(STAGE)_$(shell date +%Y%m%d).sql

sync-db:
	@echo "Syncing $(STAGE) database with local database..."
	@ssh $($(STAGE)_PROJECT_HOST) ${HETZNER} "mysqldump -h mysqldump -h $(TYPO3_DB_HOST_$(STAGE)) -u $(TYPO3_DB_USER_$(STAGE)) -p$(TYPO3_DB_PASSWORD_$(STAGE)) $(TYPO3_DB_NAME_$(STAGE)) | gzip" > tmp_$(STAGE).sql.gz
	@echo "Importing $(STAGE) database into ddev..."
	ddev import-db --file=tmp_$(STAGE).sql.gz
	@rm tmp_$(STAGE).sql.gz
	@echo "$(STAGE) database sync complete."

sync-db-production: STAGE=PRODUCTION
sync-db-production: announce-env sync-db

dump-db-production: STAGE=PRODUCTION
dump-db-production: announce-env dump-db

sync-shared-production: STAGE=PRODUCTION
sync-shared-production: announce-env sync-shared

sync-db-staging: STAGE=STAGING
sync-db-staging: announce-env sync-db

dump-db-staging: STAGE=STAGING
dump-db-staging: announce-env dump-db

sync-shared-staging: STAGE=STAGING
sync-shared-staging: announce-env sync-shared

all-production: STAGE=PRODUCTION
all-production: announce-env sync-db sync-shared

all-staging: STAGE=STAGING
all-staging: announce-env sync-db sync-shared
