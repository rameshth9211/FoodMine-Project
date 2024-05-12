// // import { verify } from 'jsonwebtoken';
// // import { UNAUTHORIZED } from '../constants/httpStatus.js';

// // export default (req, res, next) => {
// //   const token = req.headers.access_token;
// //   if (!token) return res.status(UNAUTHORIZED).send();

// //   try {
// //     const decoded = verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //   } catch (error) {
// //     res.status(UNAUTHORIZED).send();
// //   }

// //   return next();
// // };

// // import { verify } from 'jsonwebtoken';

// import { verify } from 'jsonwebtoken';
// import { UNAUTHORIZED_STATUS } from '../constants/httpStatus.js';

// export default (req, res, next) => {
//   const token = req.headers.access_token;

//   if (!token) {
//     return res.status(UNAUTHORIZED_STATUS).send({ error: 'Access token missing' });
//   }

//   try {
//     const decoded = verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('JWT Verification Error:', error.message);
//     return res.status(UNAUTHORIZED_STATUS).send({ error: 'Invalid token' });
//   }
// };

import jwt from "jsonwebtoken";
// import { UNAUTHORIZED_STATUS } from '..'
import { UNAUTHORIZED_STATUS } from '../constants/httpStatus.js';
export default (req, res, next) => {
  const token = req.headers.access_token;

  if (!token) {
    return res
      .status(UNAUTHORIZED_STATUS)
      .send({ error: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(UNAUTHORIZED_STATUS).send({ error: "Invalid token" });
  }
};
