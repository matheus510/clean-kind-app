export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://db_gaivota:I0WJV34yigNw5keu@cluster0.e6ldq.mongodb.net/gaivota?retryWrites=true&w=majority',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
