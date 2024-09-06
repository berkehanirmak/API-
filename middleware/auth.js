const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        // Authorization başlığının olup olmadığını kontrol et
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Yetkilendirme hatası, token bulunamadı" });
        }

        // Bearer'dan sonraki token kısmını al
        const token = authHeader.split(" ")[1];

        let decodedData;
        if (token) {
            // Token'ı doğrula
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
            req.userId = decodedData?.id;  // Kullanıcı ID'sini req'e ekle
        } else {
            return res.status(401).json({ message: "Token geçerli değil" });
        }

        next();  // Sonraki middleware'e geç
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Token doğrulanamadı" });
    }
}

module.exports = auth;
