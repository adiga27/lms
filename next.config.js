/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
      domains:[`${process.env.N_AWS_S3_BUCKET_NAME}.s3.${process.env.N_AWS_REGION}.amazonaws.com`]
    },
}

module.exports = nextConfig
