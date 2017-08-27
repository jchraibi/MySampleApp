#!groovy

node {
  currentBuild.result = "SUCCESS"
  env.NODEJS_HOME="${tool 'NodeJS'}"
  env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
  npm_config_cache="npm-cache"
  checkout()
  build()
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
      sh 'npm -dd i'

    } catch (err) {
      echo 'Build failed'
      echo err.message
      currentBuild.result = "FAILURE"
      throw err
    }
  }
}
