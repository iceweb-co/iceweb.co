iceweb.co/gsuite
================

On commiting to master, gitlab will build (using webpack) then deploy the build artifacts + static assets to AWS S3.
This is configured in the .gitlab-ci.yml file in the repo root.
The deployment to S3 relies on secret keys available as environment variables to the build script which are stored in gitlab online and can be changed from the project settings online.
