pipeline {

	agent any

	stages {
	
		stage('Build') {
			steps {
				echo "Building..."
				sh 'sudo su'
				sh 'docker run -v `pwd`:/build damoncheng/public:debian-build-v1'
			}
		}

		stage('Test') {
			steps {
				echo "Testing..."
				sh './main config/hello.o'
			}
		}

		stage('Deploy') {
			steps {
				echo "Deploying..."
				sh 'echo "www.imd.com" > ~/rsyncd.secrets'
				sh 'chmod 700 ~/rsyncd.secrets'

				script {
					int flag = 0;
					for (int i = 0; i < 10; ++i) {
						try {
							sh 'rsync -rvlHpogDtSu --contimeout=1  --delete --password-file=/home/docker/rsyncd.secrets ../ root@192.168.99.1::jenkins_deploy'
							break
						}
						catch(exc) {
							flag = flag + 1
						}
					}

					if (flag == 10)
					{
						sh 'exit 1'
					}
					
				}
			}
		}
	
	}
	post {
	
		failure {
			mail to: "snhellogg@gmail.com", subject: 'The Pipeline failed :(', body: 'hello jenkins two'
		}
	
	}

}
