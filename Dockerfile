FROM node:9

###################################################
#### FFMPEG Sources Setup Layer
###################################################

#Update /etc/apt/sources.list for multimedia sources for getting FFMPEG.
RUN echo 'deb http://www.deb-multimedia.org jessie main non-free' >> /etc/apt/sources.list && \
echo 'deb-src http://www.deb-multimedia.org jessie main non-free' >> /etc/apt/sources.list && \
#Download the keyring needed to update packages for deb-multimedia
wget http://www.deb-multimedia.org/pool/main/d/deb-multimedia-keyring/deb-multimedia-keyring_2016.8.1_all.deb && \
#Unpack and setup keyring for deb-multimedia
su -c 'dpkg -i deb-multimedia-keyring_2016.8.1_all.deb' && \
#Update the package list to use deb-multimedia.
su -c 'apt-get update'




###################################################
#### Dependency packages layer
###################################################


RUN su -c 'apt-get update' && su -c 'apt-get install --force-yes -y sudo' \
    && sudo apt-get install --force-yes -y ffmpeg
#    && sudo apt-get install --force-yes -y ffmpeg \ <-- uncomment this and delete the above line if you add more.
#       You know the drill. Hopefully.
#    espeak \
#    flite \
#    alsa-utils \
#    festival \
#    festvox-kallpc16k





###################################################
#### Node.JS Application Layer 
###################################################

# Install yarn because heck yeah
RUN sudo npm install --global yarn

# Create the app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN sudo yarn


# Bundle app source
COPY . .

RUN sudo npm run build-prod

# Any ports to expose
# EXPOSE 43218:43218


CMD [ "npm", "run-script", "start" ]