export interface iProfile {
  id: string;
  name: string;
  avatar: string;
}

export type sProfile = {
  id: string;
  username: string;
  avatar_url: string;
};

class Profile implements iProfile {
  id: string;
  name: string;
  avatar: string;
  constructor(sProfile: sProfile) {
    this.id = sProfile.id;
    this.name = sProfile.username;
    this.avatar = sProfile.avatar_url;
  }
}
