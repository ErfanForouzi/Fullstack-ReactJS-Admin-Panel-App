class FileController {
    upload(req, res) {
        res.json(req.file.path.substring(7));
      }
  }
  
  export default new FileController();