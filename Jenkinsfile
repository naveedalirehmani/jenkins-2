// Jenkinsfile
pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'naveedalirehmani/hello-world'
    APP_SERVER_IP = '172.31.45.153'
    SSH_USER = 'ubuntu'
    CONTAINER_NAME = 'hello-world'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/naveedalirehmani/jenkins.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
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
              docker run -d --name $CONTAINER_NAME --publish 4000:4000 $DOCKER_IMAGE
            "
          """
        }
      }
    }
  }
}