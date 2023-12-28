const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");

const app = express();
const PORT = 5003;

//들어오는 url은 허용을 안해준 상태
//Get과 Post로 DB에 전달받을 url주소도 허용할 수 있도록 넣어줘야함
app.use(cors({ origin: "http://localhost:3002" }));

//get으로 가져가는 주소만 허용해준 것
//app.use(cors()); => 이 코드는 껐다가 다시 실행해줘야함

const dbconfig = {
  user: "khbbb",
  password: "kh1234",
  connectString: "localhost:1521/XE",
};

app.use(express.json());
async function selectQuery(sql) {
  let connection;

  try {
    //DB와 연결하기
    connection = await oracledb.getConnection(dbconfig);
    const result = await connection.execute(sql);
    return result.rows.map((row) => ({
      ID: row[0],
      NAME: row[1],
      PRICE: row[2],
    }));
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

//연결 잘 됐는지 확인해주기
app.listen(PORT, () => {
  console.log(`서버 시작 : http://localhost:${PORT}`);
});

app.get("/api/cafe", async (request, response) => {
  const cafe = await selectQuery("SELECT * FROM cafe");
  response.json(cafe);
});

//post로 전달받을 쿼리 작성해주기
app.post("/api/cafe", async (request, response) => {
  const { name, price } = request.body;
  console.log("데이터 들어왔는지 확인! : ", { name, price });

  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    await connection.execute(
      "INSERT INTO cafe (ID, NAME, PRICE) VALUES (CAFE_SEQ.NEXTVAL, :name, :price)",
      { name, price },
      { autoCommit: true }
    );
    response.json({ message: "성공적으로 저장되었습니다." });
  } catch (error) {
    console.error("Error in POST /api/cafe : ", error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("커넥션 닫기 에러", err);
      }
    }
  }
});

//VALUES (CAFE_SEQ.NEXTVAL, :name 에서 콜론은 받아오는 값
