#!groovy

node {
  currentBuild.result = "SUCCESS"
  env.NODEJS_HOME="${tool 'NodeJS'}"
  env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
  env.npm_config_cache="npm-cache"
  checkout()
  build()
  test()
  cleanup()
}

def checkout () {
  stage('Checkout'){
    checkout scm
  }
}

def build() {
  stage('Build'){
    try {
      env.NODE_ENV = "test"
      print "Environment will be : ${env.NODE_ENV}"

      sh 'node -v'
      sh 'npm -v'
      sh 'npm prune'
      sh 'npm install --no-save'
    } catch (err) {
      echo 'Build failed'
      echo err.message
      currentBuild.result = "FAILURE"
      throw err
    }
  }
}

def test() {
  stage('Test'){
    try {
      sh 'npm test'
    } catch (err) {
      currentBuild.result = "FAILURE"
      echo err.message
      throw err
    }
  }
}

def cleanup() {
  stage('Cleanup'){
    try {
      sh 'npm prune'
      sh 'rm node_modules -rf'
    } catch (err) {
      currentBuild.result = "FAILURE"
      echo err.message
      throw err
    }
  }
}
