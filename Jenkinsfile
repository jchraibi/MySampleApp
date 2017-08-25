#!groovy

node {
  currentBuild.result = "SUCCESS"
  env.NODEJS_HOME="${tool 'NodeJS 6.11.2'}"
  env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
  env.npm_config_cache="npm-cache"
  // echo sh(returnStdout: true, script: 'env')
  checkout()
  build()
  //test()
  cleanup()
}

def setBuildStatus(String context, String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: context],
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/TheOpenShiftHub/MySampleApp"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

def checkout () {
  stage('Checkout'){
    checkout scm
  }
}

def build() {
  stage('Build'){
    try {
      // setBuildStatus 'continuous-integration/build', 'Building the environment...', 'PENDING'
      env.NODE_ENV = "test"
      print "Environment will be : ${env.NODE_ENV}"

      sh 'node -v'
      sh 'npm -v'
      sh 'npm prune'
      // sh 'npm install'
      // setBuildStatus 'continuous-integration/build', 'Environment built', 'SUCCESS'
    } catch (err) {
      //setBuildStatus 'continuous-integration/build', err, 'FAILURE'
      currentBuild.result = "FAILURE"

      throw err
    }
  }
}

def test() {
  stage('Test'){
    try {
      //setBuildStatus 'continuous-integration/test', 'Testing...', 'PENDING'
      sh 'npm test'
      //setBuildStatus 'continuous-integration/test', 'Tested', 'SUCCESS'
    } catch (err) {
      //setBuildStatus 'continuous-integration/test', err, 'FAILURE'
      currentBuild.result = "FAILURE"

      throw err
    }
  }
}

def cleanup() {
  stage('Cleanup'){
    try {
      //setBuildStatus 'continuous-integration/build', 'Cleaning up the environment...', 'PENDING'
      echo 'prune and cleanup'
      sh 'npm prune'
      sh 'rm node_modules -rf'
      //setBuildStatus 'continuous-integration/build', 'Environment cleaned up', 'SUCCESS'
    } catch (err) {
      //setBuildStatus 'continuous-integration/build', err, 'FAILURE'
      currentBuild.result = "FAILURE"

      throw err
    }
  }
}
