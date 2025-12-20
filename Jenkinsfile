// Jenkinsfile
pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'naveedalirehmani/hello-world'
    APP_SERVER_IP = '65.2.131.223'
    SSH_USER = 'ubuntu'
    CONTAINER_NAME = 'hello-world'
    BUILD_TAG = "${BUILD_NUMBER}"          // Jenkins build number
    IMAGE_LATEST = "${DOCKER_IMAGE}:latest"
    IMAGE_BUILD = "${DOCKER_IMAGE}:${BUILD_TAG}"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/naveedalirehmani/jenkins.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh """
          docker build --no-cache -t $IMAGE_LATEST -t $IMAGE_BUILD .
        """
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh """
            echo $PASSWORD | docker login -u $USERNAME --password-stdin
            docker push $IMAGE_LATEST
            docker push $IMAGE_BUILD
          """
        }
      }
    }

    stage('Deploy to App Server') {
      steps {
        sshagent(['ec2-ssh-key']) {
          sh """
            ssh -o StrictHostKeyChecking=no $SSH_USER@$APP_SERVER_IP "
              docker pull $IMAGE_BUILD && \
              docker rm -f $CONTAINER_NAME || true && \
              docker run -d --name $CONTAINER_NAME --publish 4000:4000 $IMAGE_BUILD
            "
          """
        }
      }
    }
  }
}
