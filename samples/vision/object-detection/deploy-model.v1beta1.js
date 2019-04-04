/**
 * Copyright 2019, Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

`use strict`;
function main(
  projectId = 'YOUR_PROJECT_ID',
  computeRegion = 'YOUR_REGION_NAME',
  modelId = 'MODEL_ID'
) {
  // [START automl_vision_object_detection_deploy_model]

  /**
   * Demonstrates using the AutoML client to deploy model.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const modelId = '[MODEL_ID]' e.g., "TEN5200971474357190656";

  //Imports the Google Cloud Automl library
  const {AutomlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutomlClient();
  async function deployModel() {
    // Get the full path of the model.
    const modelFullId = automlClient.modelPath(
      projectId,
      computeRegion,
      modelId
    );

    // Deploy a model with the deploy model request.
    automlClient
      .deployModel({name: modelFullId})
      .then(responses => {
        const response = responses[0];
        console.log(`Deployment Details:`);
        console.log(`\tName: ${response.name}`);
        console.log(`\tMetadata:`);
        console.log(`\t\tType Url: ${response.metadata.typeUrl}`);
        console.log(`\tDone: ${response.done}`);
      })
      .catch(err => {
        console.error(err);
      });
  }
  deployModel();
  // [END automl_vision_object_detection_deploy_model]
}
main(...process.argv.slice(2));
