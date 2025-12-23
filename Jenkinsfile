// Jenkinsfile
pipeline {
  agent { label 'docker-agent' }

  environment {
    DOCKER_IMAGE = 'naveedalirehmani/node-app-v2'
    APP_SERVER_IP = '65.2.131.223'
    SSH_USER = 'ubuntu'
    CONTAINER_NAME = 'node-app-v2'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/naveedalirehmani/jenkins-2.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build --no-cache -t $DOCKER_IMAGE .'
      }
    }
    
    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh """
            echo $PASSWORD | docker login -u $USERNAME --password-stdin
            docker push $DOCKER_IMAGE
          """
        }
      }
    }

    stage('Deploy to App Server') {
      steps {
        sshagent(['ec2-ssh-key']) {
          sh """
            ssh -o StrictHostKeyChecking=no $SSH_USER@$APP_SERVER_IP "
              docker pull $DOCKER_IMAGE && \
              docker rm -f $CONTAINER_NAME || true && \
              docker run -d --name $CONTAINER_NAME --publish 8000:8000 $DOCKER_IMAGE
            "
          """
        }
      }
    }
  }
}