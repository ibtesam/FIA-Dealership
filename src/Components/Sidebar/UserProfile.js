import React from "react";
import {Avatar} from "antd";

import AuthService from "../../Utils/auth.service";
import utilService from "../../Utils/utils.service";

const UserProfile = () => {
  const userInfo = AuthService.getUserInfo();

  const userName = `${utilService.capitalizedString(
    userInfo?.firstName,
    ""
  )} ${utilService.capitalizedString(userInfo?.lastName, "")}`

  return (
    <div className="profile-wrapper overflow-ellipses-text">
      <Avatar
        className="size-40 cursor-pointer mr-3 custom-avatar"
        src={`${userInfo?.firstName
          ?.trim()[0]
          ?.toUpperCase()}${userInfo?.lastName?.trim()[0]?.toUpperCase()}`}
      >
        {`${userInfo?.firstName?.trim()[0]?.toUpperCase()}${userInfo?.lastName
          ?.trim()[0]
          ?.toUpperCase()}`}
      </Avatar>
      <span className="avatar-name" title={userName}>
        <span>
          {userName}
        </span>
      </span>
    </div>
  );
};

export default UserProfile;
