pipeline {
    agent any
    tools {nodejs "nodejs"}
    stages {
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }
       
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                        def scannerHome = tool 'SonarScanner';
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Clean WS'){
            steps {
                cleanWs()
            }
        }
    }
    post {
        success {
            script {
                echo "Finished successfully :)"
            }
        }
        failure {
            script {
                echo "Failed gracefully :("
            }
        }
    }
}
