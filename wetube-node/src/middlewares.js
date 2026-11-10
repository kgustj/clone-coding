import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    }
    return res.redirect("/login");
};

export const publicMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    }
    return res.redirect("/");
};

export const checkObjectId = (req, res, next, id) => {
    if (/^[0-9a-f]{24}$/.test(id)) {
        return next();
    }
    return res.status(404).render("404", { pageTitle: "Page not found" });
};

// 처리 중 오류(DB 연결 끊김 등)가 나도 서버가 죽지 않고 오류 페이지를 보여줌
export const errorMiddleware = (error, req, res, next) => {
    console.error(error);
    if (res.headersSent) {
        return next(error);
    }
    return res.status(500).render("500", { pageTitle: "Something went wrong" });
};

// AWS 설정이 있으면 프로필 사진을 S3에, 없으면 uploads/avatars 폴더에 저장
const useS3 = Boolean(process.env.AWS_ID && process.env.AWS_SECRET && process.env.AWS_BUCKET);

const avatarStorage = useS3
    ? multerS3({
          s3: new S3Client({
              region: process.env.AWS_REGION,
              credentials: {
                  accessKeyId: process.env.AWS_ID,
                  secretAccessKey: process.env.AWS_SECRET,
              },
          }),
          bucket: process.env.AWS_BUCKET,
          acl: "public-read",
          key: (req, file, cb) => cb(null, `avatars/${Date.now()}-${file.originalname}`),
      })
    : multer.diskStorage({
          destination: "uploads/avatars",
          filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
      });

export const uploadAvatar = multer({
    storage: avatarStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});

export const uploadVideo = multer({
    dest: "uploads/videos",
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});
