export class ImageUtility {

  static setAvatar(object: any) {
    if (!object.avatarImg) {
      object.nameAvatar = ImageUtility.getAvatarName(object.firstName, object.lastName);
    } else {
      // object.avatarImg = ImageUtility.replaceImagesLinks(object.avatarImg);
    }
  }

  static getAvatarName(firstName: string, lastName: string) {
    let result = '';
    if (firstName) {
      result += firstName.substr(0, 1).toUpperCase();
    }

    if (lastName) {
      result += lastName.substr(0, 1).toUpperCase();
    }

    return result;
  }
}
