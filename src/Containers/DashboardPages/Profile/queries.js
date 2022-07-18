import { useMutation, useQuery } from "react-query";

import { AccountService } from "./../../../ApiServices";
import notificationService from "../../../Util/notification.service"
import { MediaService, AdminApiService } from "./../../../ApiServices";

const moduleName = "profile";

const profileKeys = {
    myProfile: (userId) => [moduleName, "details", userId]
};

function useProfileDetails(userId, setter) {
    return useQuery(
        profileKeys.myProfile(userId),
        async () => {
            const { ok, data, response } = await AccountService.getProfileDetail({ userId });
            if (ok) {
                return data;
            }
        },
        {
            cacheTime: Infinity,
            staleTime: Infinity,
            onSuccess: (info) => {
                return setter(info);
            }
        }
    );
}

function useUploadProfilePicture({ onSuccess }) {
    return useMutation(async (payload) => {
        const { data, ok, response } = await MediaService.uploadProfilePicture(payload);
        if (ok) {
            notificationService.success("Profile", "Avatar has been successfully updated!", true);
            onSuccess(data);
            return data;
        } else {
            notificationService.error("Profile", response?.message);
            throw new Error(response?.message);
        }
    });
}

function useRemoveProfilePicture({ onSuccess }) {
    return useMutation(async () => {
        const { data, ok, response } = await MediaService.removeProfilePicture();
        if (ok) {
            notificationService.success("Profile", "Avatar has been successfully removed!", true);
            onSuccess(data);
            return data;
        } else {
            notificationService.error("Profile", response?.message, true);
            throw new Error(response?.message);
        }
    });
}

function useResetPassword({ onSuccess }) {
    return useMutation(async (payload) => {
        const { data, ok, response } = await AdminApiService.changePassword(payload);
        if (ok) {
            notificationService.success("Reset Password", "Password has been successfully updated!", true);
            onSuccess();
            return data;
        } else {
            notificationService.error("Reset Password", response?.message, true);
            throw new Error(response?.message);
        }
    });
}

function useUpdateUserDetail({ onSuccess }) {
    return useMutation(async (payload) => {
        const { data, ok, response } = await AccountService.updateUserProfile(payload);
        if (ok) {
            notificationService.success("Profile", "User has been successfully updated!!", true);
            onSuccess(payload);
            return data;
        } else {
            notificationService.error("Profile", response?.message, true);
            throw new Error(response?.message);
        }
    });
}

export { useProfileDetails, useUploadProfilePicture, useRemoveProfilePicture, useResetPassword, useUpdateUserDetail };
