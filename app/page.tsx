"use client";
import { useState, useEffect } from "react";

type Question = {
  section: string;
  question: string;
  options: string[];
  answer: number;
};

type AnswerRecord = {
  question: string;
  selected: number;
  correct: number;
  section: string;
  options: string[];
};

const ALL_QUESTIONS: Question[] = [
  {
    section: "Phần Mở Đầu",
    question: "Thiên Chúa là Đấng nào?",
    options: [
      "Đấng ban hạnh phúc cho muôn loài.",
      "Đấng dựng nên trời đất muôn vật.",
      "Đấng làm chủ muôn loài.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần Mở Đầu",
    question: "Loài người dựa vào đâu để tìm biết Thiên Chúa?",
    options: [
      "Dựa vào thiên nhiên.",
      "Dựa vào những khát vọng chính đáng trong lòng người.",
      "Dựa vào tôn giáo.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần Mở Đầu",
    question:
      "Nhìn vào trời đất với trật tự lạ lùng, con người nhận ra phải có Đấng Sáng Tạo. Cách nhận biết này gọi là nhận biết theo luật gì?",
    options: [
      "Luật tình thương.",
      "Luật loại trừ.",
      "Luật nhân quả.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question: "Tự đáy lòng, con người cảm thấy mình luôn khao khát điều gì?",
    options: [
      "Khao khát điều chân thật.",
      "Khao khát điều tốt.",
      "Khao khát điều đẹp.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần Mở Đầu",
    question:
      "Vì sao đạo Công giáo khẳng định mình giúp loài người tìm kiếm Thiên Chúa là con đường chắc chắn?",
    options: [
      "Đạo Công giáo do chính Thiên Chúa thiết lập.",
      "Đạo Công giáo do các thiên thần lãnh đạo.",
      "Đạo Công giáo do các người lành thánh hướng dẫn.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần Mở Đầu",
    question:
      "Cùng với việc chỉ đường dẫn lối, Thiên Chúa còn làm gì cho loài người?",
    options: [
      "Giúp cho trí khôn nhận định sáng suốt.",
      "Giúp cho ý trí kiên trì.",
      "Giúp cho tâm hồn phấn khởi.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần Mở Đầu",
    question:
      "Thiên Chúa dùng nhiều cách thức để tỏ mình cho loài người, nhưng cách rõ ràng nhất là gì?",
    options: ["Vũ trụ.", "Khát vọng.", "Thánh Kinh.", "Lương tâm."],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question:
      "Bộ sách được linh ứng ghi chép ý định và hành động cứu chuộc của Thiên Chúa gọi là gì?",
    options: ["Ngũ Thư.", "Tứ Kinh.", "Thánh Kinh.", "Đạo đức kinh."],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question: "Thánh Kinh trọn bộ (Cựu Ước - Tân Ước) gồm có bao nhiêu cuốn?",
    options: ["63 cuốn.", "66 cuốn.", "73 cuốn.", "76 cuốn."],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question:
      "Cựu Ước là những sách viết về giao ước xưa giữa Thiên Chúa và ai?",
    options: [
      "Dân tộc Ai cập.",
      "Dân tộc Hy lạp.",
      "Dân tộc Ítraen.",
      "Dân tộc Syria.",
    ],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question: "Cựu Ước gồm có bao nhiêu cuốn sách?",
    options: ["27 cuốn.", "40 cuốn.", "46 cuốn.", "66 cuốn."],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question:
      "Tân Ước là những sách viết về giao ước ký kết giữa Thiên Chúa và loài người qua ai?",
    options: ["Ngôn sứ Môsê.", "Tư tế Aharon.", "Chúa Kitô.", "Thánh Phêrô."],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question: "Tân Ước gồm có bao nhiêu cuốn sách?",
    options: ["12 cuốn.", "24 cuốn.", "27 cuốn.", "32 cuốn."],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question:
      "Nội dung Thánh Kinh là chương trình và hành động cứu độ của Thiên Chúa được ai thực hiện?",
    options: [
      "Các thiên thần.",
      "Chúa Giêsu Kitô.",
      "Ngôn sứ Môsê.",
      "Các Tông đồ.",
    ],
    answer: 1,
  },
  {
    section: "Phần Mở Đầu",
    question: "Nhờ Thánh Kinh, chúng ta biết được điều gì?",
    options: [
      "Thiên Chúa là ai.",
      "Thiên Chúa yêu thương chúng ta thế nào.",
      "Chúng ta phải làm gì để đáp lại tình thương của Thiên Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần Mở Đầu",
    question: "Chúng ta phải đón nhận Thánh Kinh trong tâm tình nào?",
    options: [
      "Tâm tình vui mừng.",
      "Tâm tình tạ ơn.",
      "Ước muốn được dạy dỗ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần Mở Đầu",
    question: "Tại sao ta lại ước muốn được dạy dỗ khi đón nhận Thánh Kinh?",
    options: [
      "Vì Thánh Kinh là lời của con người giúp ta sống tốt mỗi ngày.",
      "Vì Thánh Kinh dạy ta cách chắc chắn, trung thành những chân lý thánh ký ghi lại vì phần rỗi chúng ta.",
      "Vì Thánh Kinh có ích lợi cho việc sửa dạy, biện bác, sửa trị và rèn luyện trong công chính.",
      "Chỉ có b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần Mở Đầu",
    question: "Chúng ta phải đọc Thánh Kinh như thế nào?",
    options: [
      "Phải đọc Thánh Kinh trong thế giới.",
      "Phải đọc Thánh Kinh trong đức tin.",
      "Phải đọc Thánh Kinh trong Hội Thánh.",
      "Chỉ có b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Trời đất muôn vật bởi đâu mà có?",
    options: [
      "Bởi tự nhiên mà có.",
      "Bởi ngẫu nhiên mà có.",
      "Bởi Thiên Chúa dựng nên.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Loài người là hình ảnh của Thiên Chúa, được Ngài ban cho điều gì?",
    options: [
      "Làm chủ vũ trụ.",
      "Hưởng hạnh phúc đời đời.",
      "Thăng tiến xã hội.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Loài người là hình ảnh của Thiên Chúa nhờ có điều gì?",
    options: ["Lý trí.", "Ý chí.", "Tự do.", "Cả a, b và c đúng."],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Nhờ có lý trí, ý chí và tự do nên con người phải chịu điều gì với các hành vi của mình?",
    options: [
      "Được mọi người ca tụng.",
      "Người khác soi xét.",
      "Trách nhiệm.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Nếu hành động của ta tốt thì được thưởng, trái lại hành động xấu thì sẽ bị gì?",
    options: ["Được thưởng.", "Bị phạt.", "Được bỏ qua.", "Cả a, b và c đúng."],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Hôn nhân là cách thế tự nhiên giúp đôi bạn làm gì?",
    options: [
      "Phát triển nhân cách.",
      "Xây dựng xã hội.",
      "Xây dựng Hội Thánh.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Trước mặt Thiên Chúa, người nữ thế nào?",
    options: [
      "Người nữ thua kém người nam.",
      "Người nữ cùng phẩm giá với người nam.",
      "Người nữ cùng bình đẳng với người nam.",
      "Chỉ có b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Với Thiên Chúa, loài người phải thế nào?",
    options: [
      "Nhận biết Thiên Chúa.",
      "Tôn thờ Thiên Chúa.",
      "Yêu mến Thiên Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Với nhau, loài người phải như thế nào để được hạnh phúc đời đời?",
    options: [
      "Yêu thương.",
      "Hòa thuận.",
      "Tranh chấp.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Thiên Chúa còn dựng nên loài vô hình là các thiên thần. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Các thiên thần được Thiên Chúa dựng nên có nghĩa vụ gì?",
    options: [
      "Tôn thờ Thiên Chúa.",
      "Thực hành mệnh lệnh của Thiên Chúa.",
      "Giảng dạy lời Thiên Chúa.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ma quỷ cũng do Thiên Chúa dựng nên. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Các thiên thần phản loạn gọi là ma quỷ, nên bị phạt thế nào?",
    options: ["Thiên đàng.", "Luyện ngục.", "Hỏa ngục.", "Trần gian."],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ai đã xúi giục nguyên tổ Ađam – Evà phạm tội?",
    options: ["Thiên thần.", "Con người.", "Ma quỷ.", "Cả a, b và c đúng."],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Sau khi dựng nên loài người, Thiên Chúa ban cho con người những đặc ân như là gì?",
    options: [
      "Trí khôn minh mẫn.",
      "Ý chí luôn hướng về điều lành.",
      "Không phải đau khổ, không phải chết.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Sau khi phạm tội, hai ông bà nguyên tổ và con cháu chịu hậu quả thế nào?",
    options: [
      "Mất tình thuận thảo với Thiên Chúa.",
      "Mất hy vọng sống hạnh phúc mai sau.",
      "Phải trầm luân hỏa ngục đời đời.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tội là gì?",
    options: [
      "Tội là hành vi xúc phạm đến Thiên Chúa.",
      "Tội gây tổn thương cho bản thân.",
      "Tội làm mất bình an của tâm hồn và làm đổ vỡ tình liên đới với tha nhân.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tội là lỗi luật Chúa và Hội Thánh ở những điểm nào?",
    options: [
      "Trong tư tưởng.",
      "Trong lời nói.",
      "Việc làm và những điều thiếu sót.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Có hai loại tội: tội trọng và tội nhẹ. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thế nào là tội trọng?",
    options: [
      "Tội trọng là cố tình phạm luật Chúa.",
      "Trong những điều quan trọng.",
      "Chúng ta đã kịp suy biết.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tội trọng làm hại chúng ta thế nào?",
    options: [
      "Tội trọng cắt đứt tình nghĩa với Chúa.",
      "Nếu không hối cải thì sẽ phải xa cách Chúa đời đời.",
      "Bớt lòng yêu mến Thiên Chúa.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thế nào là tội nhẹ?",
    options: [
      "Tội nhẹ là phạm một điều luật nhẹ.",
      "Tội nhẹ là phạm một điều quan trọng nhưng chưa kịp suy biết.",
      "Tội nhẹ là phạm một điều quan trọng nhưng chưa hoàn toàn ưng theo.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tội nhẹ làm hại chúng ta thế nào?",
    options: [
      "Bớt lòng yêu mến Thiên Chúa.",
      "Dễ phạm tội trọng.",
      "Cắt đứt tình nghĩa với Chúa.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tội phản bội của hai ông bà nguyên tổ gọi là tội gì?",
    options: [
      "Tội phản bội.",
      "Tội phạm sự thánh.",
      "Tội tổ tông.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tội tổ tông tác hại khủng khiếp trên con cháu thế nào?",
    options: [
      "Làm mất vinh dự làm con Chúa.",
      "Không được thừa hưởng gia nghiệp mai sau.",
      "Làm cho lý trí tối tăm, ý chí suy nhược, tình dục nổi loạn.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thiên Chúa có thái độ nào khi nguyên tổ phạm tội?",
    options: [
      "Thiên Chúa đã nghiêm phạt nguyên tổ.",
      "Thiên Chúa vẫn một lòng thương xót và hứa ban ơn cứu độ.",
      "Thiên Chúa bỏ rơi nguyên tổ.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      '"Ta sẽ gây mối thù giữa mi và người đàn bà" (Stk 3,15). Lời này chỉ về người Con của Mẹ Maria là ai?',
    options: [
      "Thánh Gioan Tẩy Giả.",
      "Thánh Phêrô tông đồ.",
      "Đức Giêsu Kitô.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Khi bắt đầu công cuộc cứu chuộc, Thiên Chúa đã chọn gọi ai làm tổ phụ dân riêng Ngài?",
    options: [
      "Tổ phụ Ápraham.",
      "Tổ phụ Nôê.",
      "Tổ phụ Hêli.",
      "Tổ phụ Giesê.",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Một thử thách lớn về lòng tin mà Thiên Chúa đòi nơi tổ phụ Ápraham là gì?",
    options: [
      "Từ bỏ quê cha đất tổ.",
      "Từ bỏ vợ con.",
      "Sát tế người con độc nhất.",
      "Từ bỏ của cải vật chất.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Khi nạn đói hoành hành tại Canaan, đại gia đình tổ phụ Giacóp di cư sang đâu?",
    options: ["Nước Syria.", "Nước Hy lạp.", "Nước Ba tư.", "Nước Ai cập."],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Tại Ai cập, con cháu tổ phụ Giacóp bị muôn ngàn đau khổ cho tới khi Thiên Chúa sai ai đến giải thoát họ?",
    options: ["Ông Ađam.", "Ông Giôsuê.", "Ông Môsê.", "Đức Giêsu."],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Ông Môsê hướng dẫn dân tới Đất Hứa sau hành trình trong sa mạc bao nhiêu năm?",
    options: ["12 năm.", "25 năm.", "40 năm.", "50 năm."],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Ngày ra đi của dân Ítraen khỏi Ai cập được đánh dấu bằng sự kiện gì?",
    options: [
      "Dấu lạ nước sông Nin tràn ngập máu đỏ.",
      "Cuộc thần hiện của Thiên Chúa trên núi Sinai.",
      "Bữa tiệc Vượt Qua với thịt chiên nướng.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Máu chiên được bôi lên cửa làm dấu, nhờ dấu này dân Ítraen được hưởng điều gì?",
    options: [
      "Người Ítraen được ra đi bình an.",
      "Con đầu lòng của người Ítraen được an toàn.",
      "Người Ítraen vượt qua Biển Đỏ an toàn.",
      "Cả a, b và c đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Chúa Giêsu đã hiến dâng mình như Chiên Vượt Qua vì chính Người sẽ giải thoát loài người khỏi nô lệ tội lỗi. Ngài là gì?",
    options: [
      "Chiên Vượt Qua.",
      "Đấng giải thoát.",
      "Bánh từ trời.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tại núi Sinai, biến cố gì quan trọng xảy đến với dân Ítraen?",
    options: [
      "Thiên Chúa phạt những kẻ không tin.",
      "Thiên Chúa ngăn cản binh lính Ai cập tiến đánh.",
      "Thiên Chúa ký kết giao ước với Ítraen.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Khi vào Đất Hứa, chính Thiên Chúa hướng dẫn dân chúng qua những ai?",
    options: [
      "Các vua.",
      "Các thẩm phán.",
      "Các tư tế.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Thiên Chúa hứa thiết lập cho vua nào một triều đại vững bền, và một người trong dòng dõi đó sẽ là Đấng Cứu Thế?",
    options: ["Vua Saun.", "Vua Đavít.", "Vua Hêrôđê.", "Vua Pharaô."],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Tại núi Sinai, qua Giao ước, Thiên Chúa cam kết gì với dân Ítraen?",
    options: [
      "Thiên Chúa nhận dân Ítraen làm dân riêng.",
      "Thiên Chúa nhận chăm sóc dân Ítraen.",
      "Thiên Chúa hướng dẫn vận mệnh toàn dân.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Qua Giao ước, dân Ítraen cam kết gì với Thiên Chúa?",
    options: [
      "Dân Ítraen cố gắng vượt qua Biển Đỏ ráo chân.",
      "Dân Ítraen cam kết tôn thờ Thiên Chúa là Chúa độc nhất.",
      "Dân Ítraen cam kết vâng giữ mọi luật Người truyền.",
      "Chỉ có b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Giao ước do sáng kiến của Thiên Chúa, tuy không bình đẳng nhưng đủ tính pháp lý vì có điều gì?",
    options: [
      "Có sự chấp thuận rõ rệt về phía Ítraen.",
      "Có sự tự do về phía Ítraen.",
      "Có ngôn sứ Môsê hướng dẫn.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Lề Luật Thiên Chúa ban gồm những gì?",
    options: [
      "Các ý định của Thiên Chúa.",
      "Các mệnh lệnh của Thiên Chúa.",
      "Các giáo huấn của Thiên Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Lề Luật được ghi chép ở phần nào trong bộ Thánh Kinh?",
    options: ["Ngôn sứ.", "Ngũ Thư.", "Khôn ngoan.", "Lịch sử."],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Sách nào không thuộc bộ Ngũ Thư?",
    options: [
      "Thánh vịnh.",
      "Xuất hành, Dân số.",
      "Lêvi và Thứ Luật.",
      "Khởi nguyên.",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Lề Luật Môsê giúp dân điều gì?",
    options: [
      "Biết cách tôn thờ Thiên Chúa.",
      "Biết cách cư xử với tha nhân.",
      "Biết cách cư xử với chính mình.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ngôn sứ là người được Thiên Chúa tuyển chọn để sai đi làm gì?",
    options: [
      "Làm các dấu lạ tỏ tường.",
      "Loan truyền Lời Chúa cho dân Người.",
      "Để giúp đỡ con người sống hạnh phúc.",
      "Cả a, b và c đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Khi dân đi sai đường lối của Thiên Chúa, các ngôn sứ làm gì?",
    options: [
      "Kêu gọi họ luôn tin tưởng vào Thiên Chúa.",
      "Tiên báo các tai họa sẽ đến.",
      "Loan báo Đấng Thiên Sai sẽ đến.",
      "Nhắc nhở, khuyến cáo họ trở về cùng Thiên Chúa.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Khi dân cố chấp trong đường lối sai lầm, các ngôn sứ làm gì?",
    options: [
      "Kêu gọi họ luôn tin tưởng vào Thiên Chúa.",
      "Tiên báo các tai họa sẽ đến.",
      "Loan báo Đấng Thiên Sai sẽ đến.",
      "Nhắc nhở, khuyến cáo họ trở về cùng Thiên Chúa.",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question:
      "Khi dân thất vọng, buông xuôi trong thời lưu đày, các ngôn sứ làm gì?",
    options: [
      "Kêu gọi họ luôn tin tưởng vào Thiên Chúa.",
      "Tiên báo các tai họa sẽ đến.",
      "Loan báo Đấng Thiên Sai sẽ đến.",
      "Nhắc nhở, khuyến cáo họ trở về cùng Thiên Chúa.",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Khi dân mệt mỏi vì mong chờ Đấng Cứu Thế, các ngôn sứ làm gì?",
    options: [
      "Kêu gọi họ luôn tin tưởng vào Thiên Chúa.",
      "Tiên báo các tai họa sẽ đến.",
      "Loan báo Đấng Thiên Sai sẽ đến thực hiện ơn cứu độ.",
      "Nhắc nhở, khuyến cáo họ trở về cùng Thiên Chúa.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Lời loan báo về Đấng Thiên Sai như thế nào?",
    options: [
      "Sinh bởi một Trinh nữ; sinh tại Bêlem thành vua Đavít.",
      "Ngài sẽ chữa người mù, què, câm, điếc, rao giảng Tin mừng cho người nghèo khổ.",
      "Ngài sẽ chết và sống lại như thế nào.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ngôn sứ nối kết thời Cựu Ước và Tân Ước là ai?",
    options: [
      "Ngôn sứ Êlia.",
      "Ngôn sứ Môsê.",
      "Ngôn sứ Isaia.",
      "Ngôn sứ Gioan Tẩy Giả.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Vinh dự lớn nhất của ngôn sứ Gioan Tẩy giả là gì?",
    options: [
      "Được thấy Chúa Cứu Thế.",
      "Được giới thiệu Chúa Cứu Thế cho người đương thời.",
      "Chết cùng với Chúa Cứu Thế.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Sứ thần truyền tin cho Đức Maria tên là gì?",
    options: [
      "Sứ thần Raphaen.",
      "Sứ thần Gáprien.",
      "Sứ thần Micaen.",
      "Thiên thần Kêrubim.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Thiên Chúa sai sứ thần Gáprien đến làng nào truyền tin cho Đức Maria?",
    options: ["Làng Bêlem.", "Làng Mácđala.", "Làng Samaria.", "Làng Nadarét."],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Thiên Chúa sai sứ thần Gáprien loan báo cho Đức Maria điều gì?",
    options: [
      "Bà sẽ thụ thai.",
      "Bà sẽ sinh một Con trai.",
      "Sẽ đặt tên là Giêsu.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Lễ Giáng sinh là lễ nào?",
    options: [
      "Lễ người Do thái Tạ Ơn sau mùa gặt.",
      "Lễ người Do thái mừng được cứu thoát khỏi Ai cập.",
      "Lễ người Kitô mừng việc Chúa Giêsu Phục sinh.",
      "Lễ người Kitô mừng kỷ niệm Chúa Giêsu sinh ra tại nước Do thái.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giêsu sinh ra tại thành nào?",
    options: [
      "Thành Giêrusalem.",
      "Thành Nadarét.",
      "Thành Bêlem.",
      "Thành Babylon.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Khi Chúa Giêsu giáng sinh tại Bêlem, có những ai đến viếng thăm?",
    options: [
      "Những người mục đồng.",
      "Các đạo sĩ từ phương đông.",
      "Các tư tế thành Giêrusalem.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Vua nào tìm giết Hài Nhi Giêsu?",
    options: [
      "Vua Hêrôđê Cả.",
      "Vua Pharaon.",
      "Vua Hêrôđê Áckhêlao.",
      "Vua Hêrôđê Antipát.",
    ],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Để tránh cuộc truy sát của vua Hêrôđê, gia đình Hài Nhi trốn sang đâu?",
    options: [
      "Trốn sang Hy lạp.",
      "Trốn sang Ai cập.",
      "Trốn sang Li băng.",
      "Trốn sang Syria.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Đâu là lý do người Công giáo mừng đại lễ Giáng sinh?",
    options: [
      "Hài Nhi Giêsu chính là Đấng Cứu Thế Thiên Chúa đã hứa khi tuyên phạt nguyên tổ.",
      "Đấng muôn dân mong đợi.",
      "Đấng các ngôn sứ đã loan báo.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúng ta có tâm tình nào khi mừng lễ Giáng sinh?",
    options: [
      "Chúng ta cảm mến sâu xa tình Chúa yêu ta.",
      "Chúng ta phải biết yêu thương mọi người.",
      "Chúng ta cùng nhau nhiệt thành làm việc.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Khi nghe tin vua Hêrôđê qua đời, thánh Giuse và Đức Mẹ đưa Chúa Giêsu về lập cư tại đâu?",
    options: ["Tại Bêlem.", "Tại Giêrusalem.", "Tại Nadarét.", "Tại Mácđala."],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giêsu đã làm gì ở Nadarét?",
    options: [
      "Chúa Giêsu luôn cầu nguyện, học hỏi Thánh Kinh.",
      "Làm việc.",
      "Vâng lời Mẹ Maria và thánh Giuse.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Đời sống ẩn đật của Chúa Giêsu dạy chúng ta những gì?",
    options: [
      "Dạy chúng ta yêu cuộc sống bình dị, đơn giản.",
      "Dạy chúng ta yêu lao động.",
      "Dạy chúng ta chu toàn bổn phận với Thiên Chúa, cha mẹ và mọi người.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Ai là người dọn đường cho Chúa Cứu Thế?",
    options: [
      "Ông Gioan Tẩy Giả.",
      "Tư tế Dacaria.",
      "Ngôn sứ Êlia.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Trong sa mạc 40 ngày đêm, Chúa Giêsu thế nào?",
    options: [
      "Chúa Giêsu chịu ma quỷ cám dỗ.",
      "Chúa Giêsu rao giảng Nước Thiên Chúa.",
      "Chúa Giêsu đã ăn chay cầu nguyện.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Hội Thánh dạy gì về việc ăn chay?",
    options: [
      "Ăn chay để giữ gìn sức khỏe.",
      "Ăn chay trong những ngày Hội Thánh buộc.",
      "Ăn chay để tiết kiệm.",
      "Ăn chay để làm việc thiện.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Hội Thánh dạy về việc ăn chay thế nào?",
    options: [
      "Ăn một bữa chính.",
      "Ăn hai bữa còn lại ăn ít hơn.",
      "Giữa các bữa ăn, theo truyền thống Hội Thánh Việt Nam, chỉ dùng nước lã hoặc trà.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Những ai phải ăn chay?",
    options: [
      "Mọi tín hữu trọn 14 tuổi đến bắt đầu 60 tuổi.",
      "Mọi tín hữu trọn 18 tuổi đến bắt đầu 60 tuổi.",
      "Mọi tín hữu trọn 21 tuổi đến bắt đầu 60 tuổi.",
      "Mọi tín hữu trọn 18 tuổi cho đến mãn đời.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Cùng với việc ăn chay, Hội Thánh còn dạy gì nữa?",
    options: [
      "Bố thí.",
      "Làm việc thiện.",
      "Kiêng thịt.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Những ai phải kiêng thịt?",
    options: [
      "Mọi tín hữu từ 7 tuổi trọn cho đến mãn đời.",
      "Mọi tín hữu từ 14 tuổi trọn cho đến mãn đời.",
      "Mọi tín hữu từ 16 tuổi trọn cho đến mãn đời.",
      "Mọi tín hữu từ 18 tuổi trọn cho đến mãn đời.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Ăn chay và kiêng thịt trong những ngày Hội Thánh buộc là ngày nào?",
    options: [
      "Ngày Thứ Sáu Tuần Thánh.",
      "Ngày Thứ Tư Lễ Tro.",
      "Ngày Thứ Bảy Vọng Phục Sinh.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Vào những ngày thứ sáu trong năm không trùng lễ trọng, Hội Thánh dạy gì?",
    options: [
      "Giữ luật ăn chay.",
      "Kiêng thịt hoặc phải kiêng một thức ăn nào khác.",
      "Vui vẻ như mọi ngày.",
      "Cả a, b và c đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "HĐGM Việt Nam (4/1991) đã ấn định thay thế việc kiêng thịt ngày thứ sáu bằng gì?",
    options: [
      "Đọc hay nghe một đoạn Lời Chúa.",
      "Làm một việc hãm mình đền tội.",
      "Bố thí cho người nghèo, làm việc công ích.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Khi bắt đầu rao giảng, Chúa Giêsu loan báo điều gì?",
    options: [
      "Thời kỳ đã mãn và Nước Thiên Chúa đã gần đến.",
      "Anh em phải sám hối.",
      "Anh em phải tin vào Tin mừng.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Tin vào Tin mừng là tin vào những điều gì?",
    options: [
      "Tin vào những điều Chúa Giêsu dạy được ghi lại trong Thánh Kinh.",
      "Tin vào chính Chúa Giêsu.",
      "Tin vào các người nghe Chúa.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Để đón nhận Nước Thiên Chúa, chúng ta phải làm gì?",
    options: [
      "Phải sám hối.",
      "Tin vào Tin mừng.",
      "Phải học giáo lý.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Khi loan báo Nước Thiên Chúa, Chúa Giêsu đã dạy chúng ta biết mầu nhiệm gì?",
    options: [
      "Mầu nhiệm Ngôi Hai Nhập Thể làm người.",
      "Mầu nhiệm Thiên Chúa Ba Ngôi.",
      "Mầu nhiệm Tử Nạn và Phục Sinh.",
      "Cả a, b và c đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Mầu nhiệm một Chúa Ba Ngôi dạy ta biết có một Thiên Chúa mà Người có Ba Ngôi thế nào?",
    options: [
      "Ngôi thứ Nhất là Cha.",
      "Ngôi thứ Hai là Con.",
      "Ngôi thứ Ba là Thánh Thần.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Kinh nào nói lên việc chúng ta tuyên xưng mầu nhiệm Chúa Ba Ngôi?",
    options: [
      "Kinh Lạy Cha.",
      "Kinh Kính Mừng.",
      "Kinh Sáng danh.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Khi chúng ta làm gì là lúc tuyên xưng mầu nhiệm Chúa Ba Ngôi trong cuộc sống hằng ngày?",
    options: [
      "Ăn chay hãm mình.",
      "Dấu thánh giá.",
      "Lao động.",
      "Làm việc thiện nguyện.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúng ta phải làm gì đối với Thiên Chúa Ba Ngôi?",
    options: [
      "Chúng ta phải thờ lạy, biết ơn.",
      "Chúng ta phải kính mến.",
      "Chúng ta phải tin cậy.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Tôn thờ là tâm tình và thái độ của loài người đối với ai?",
    options: ["Thiên Chúa.", "Thiên Thần.", "Tổ tiên.", "Người quyền thế."],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Thờ phượng Thiên Chúa là nhận biết Chúa là Cha đã sáng tạo ta, nên ta phải hết lòng làm gì?",
    options: [
      "Phải hết lòng thờ kính Thiên Chúa.",
      "Phải hết lòng mến yêu Thiên Chúa.",
      "Phải hết lòng phụng sự Thiên Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Điều răn nào dạy chúng ta phải thờ phượng một Thiên Chúa và kính mến Người trên hết mọi sự?",
    options: [
      "Điều răn thứ nhất.",
      "Điều răn thứ hai.",
      "Điều răn thứ ba.",
      "Điều răn thứ tư.",
    ],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Điều răn nào dạy chúng ta tôn kính Chúa vì tên Người là Thánh và là chính Người?",
    options: [
      "Điều răn thứ nhất.",
      "Điều răn thứ hai.",
      "Điều răn thứ ba.",
      "Điều răn thứ tư.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Kính trọng Danh Thiên Chúa là không được làm gì?",
    options: [
      "Kêu tên Chúa cách bừa bãi.",
      "Kêu tên Chúa cách vô lý.",
      "Kêu tên Chúa cách nhẹ dạ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Kính trọng Danh Thiên Chúa, về mặt tích cực chúng ta phải làm gì?",
    options: [
      "Nguyện Danh Cha cả sáng.",
      "Phổ biến giáo lý Đạo Chúa.",
      "Có thái độ kính cẩn khi đọc hoặc nghe đọc tên Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Điều Răn thứ ba dạy chúng ta cử hành ngày Chúa Nhật thế nào?",
    options: [
      "Tham dự Thánh Lễ.",
      "Kiêng việc xác ngày Chúa Nhật.",
      "Làm các việc đạo đức, bác ái.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Ai tham dự thánh lễ Chúa Nhật là đã làm gì?",
    options: [
      "Sống tốt đời đẹp đạo.",
      "Sống bác ái yêu thương với mọi người.",
      "Chu toàn nghĩa vụ cao cả nhất trong tuần để tôn vinh Thiên Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Ai tham dự thánh lễ Chúa Nhật sẽ nhận được những gì?",
    options: [
      "Tràn đầy ân sủng.",
      "Niềm vui chan hòa.",
      "Lời khen ngợi của cộng đoàn.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Bỏ thánh lễ ngày Chúa Nhật khi không có lý do chính đáng là tội nặng hay tội nhẹ?",
    options: ["Tội nặng.", "Tội nhẹ.", "Không phải tội.", "Chỉ là lỗi nhỏ."],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Kiêng việc xác ngày Chúa Nhật và ngày lễ buộc có ý nghĩa gì?",
    options: [
      "Để có thời gian chu toàn nghĩa vụ thờ phượng Chúa và làm việc bác ái.",
      "Mừng kỷ niệm việc Chúa Giêsu sống lại vào ngày đầu tuần.",
      "Tuân giữ lệnh truyền của Thiên Chúa về ngày lễ nghỉ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Nhân đức nào là nhân đức siêu nhiên giúp ta vững lòng phó thác vào Chúa và chấp nhận những điều Chúa dạy nhờ Hội Thánh truyền lại?",
    options: ["Đức tin.", "Đức cậy.", "Đức mến.", "Cả a, b và c đúng."],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Đức cậy là nhân đức siêu nhiên giúp ta trông đợi vững vàng nhờ công nghiệp của ai?",
    options: ["Thiên Chúa.", "Chúa Giêsu.", "Hội Thánh.", "Các tông đồ."],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Trong thực tế, Đức Cậy giúp chúng ta sống thế nào?",
    options: [
      "Đừng quá bám víu vào trần gian, của cải, danh vọng.",
      "Giúp ta phấn khởi dùng mọi phương tiện Chúa ban để mưu tìm hạnh phúc bất diệt.",
      "Giúp ta nhẫn nại trong mọi thử thách.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Đức mến là nhân đức siêu nhiên làm cho ta thế nào?",
    options: [
      "Kính mến Chúa trên hết mọi sự.",
      "Thương yêu mọi người như Chúa yêu ta.",
      "Nhiệt tình chung tay xây dựng xã hội.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Đức Tin, Đức Cậy, Đức Mến: nhân đức nào tồn tại ở đời sau?",
    options: ["Đức Tin.", "Đức Cậy.", "Đức Mến.", "Cả a, b và c đúng."],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Thờ phượng là dâng lên Thiên Chúa sự gì mà Người có quyền đòi hỏi nơi chúng ta?",
    options: [
      "Sự công bằng.",
      "Sự tôn thờ.",
      "Lòng yêu thương.",
      "Sự dũng cảm.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Đức thờ phượng: hành động bên ngoài đó là những cử chỉ, lời nói và hành động nào?",
    options: [
      "Tế lễ, cử hành các Bí tích, tham dự Giờ Kinh Phụng Vụ.",
      "Các kinh đọc riêng, lời khấn hứa.",
      "Các hoạt động tông đồ truyền giáo.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Điều Răn thứ tư dạy chúng ta những gì?",
    options: [
      "Dạy chúng ta sống hiếu thảo với cha mẹ, ông bà.",
      "Dạy chúng ta sống hiếu thảo với tổ tiên.",
      "Dạy chúng ta những bổn phận của cha mẹ đối với con cái.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Sống hiếu thảo hệ tại điều gì?",
    options: [
      "Hệ tại yêu mến.",
      "Hệ tại tôn kính, vâng lời.",
      "Hệ tại giúp đỡ cha mẹ và các bậc bề trên.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Khi ông bà cha mẹ qua đời, con cháu phải làm gì?",
    options: [
      "Phải lo chôn cất các ngài.",
      "Phải lo cầu nguyện cho các ngài.",
      "Phải lo dâng lễ cho các ngài.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Tại sao lại phải vâng lời ông bà cha mẹ?",
    options: [
      "Vì các ngài là những người khôn ngoan.",
      "Vì các ngài thay mặt Chúa dạy dỗ ta những điều hay lẽ phải.",
      "Vì các ngài là bậc cao niên, nhiều kinh nghiệm.",
      "Cả a, b và c đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Cha mẹ có những bổn phận nào với con cái?",
    options: [
      "Sinh sản có trách nhiệm.",
      "Nuôi nấng, dạy dỗ con cái nên người tốt.",
      "Nên tín hữu nhiệt thành.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Người tín hữu được tái sinh trong Hội Thánh, vì thế phải như thế nào đối với Hội Thánh?",
    options: [
      "Phải yêu mến, vâng lời và bênh vực Hội Thánh.",
      "Phải cộng tác với hàng giáo phẩm trong việc xây dựng Hội Thánh.",
      "Phải truyền bá đức tin.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Tại sao chúng ta phải tôn trọng thể xác?",
    options: [
      "Vì thân xác là kỳ công của Thiên Chúa.",
      "Vì thân xác là Đền thờ của Chúa Thánh Thần.",
      "Vì thân xác ngày sau sẽ sống lại.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Tại sao chúng ta phải tôn trọng sự sống?",
    options: [
      "Vì sự sống được cha mẹ sinh ra một cách tự nhiên.",
      "Vì Thiên Chúa đã tạo dựng nên con người có linh hồn và thể xác.",
      "Vì sự sống là ân huệ quí giá nhất trong phạm vi tự nhiên mà Thiên Chúa đã ban cho chúng ta.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Để tôn trọng thân xác và sự sống, chúng ta phải làm gì?",
    options: [
      "Phải bồi dưỡng, trau dồi sức khỏe.",
      "Phải tránh những gì gây hại cho sức khỏe.",
      "Phải siêng năng lao động tay chân.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Những việc gây hại cho sức khỏe là những việc nào?",
    options: [
      "Làm việc quá độ, nghiện ngập, say sưa.",
      "Hủy hoại thân thể, phá thai.",
      "Đánh đập người khác, bắt cóc, xúi giục kẻ khác làm hại người ta.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Để tôn trọng sức khỏe tinh thần và siêu nhiên, chúng ta phải làm gì?",
    options: [
      "Phải nuôi dưỡng những tinh thần cao đẹp.",
      "Phát triển tài năng, trau dồi nghề nghiệp.",
      "Tránh những tư tưởng bất chính.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Điều nào không phải là tư tưởng bất chính?",
    options: [
      "Giận hờn, ghen ghét.",
      "Oán thù, dâm ô.",
      "Những lời nói sàm sỡ, thiếu đứng đắn.",
      "Yêu thương, tha thứ.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Người sống đời đôi bạn phải sống trong sạch thế nào?",
    options: [
      "Trung thành với bạn mình.",
      "Tôn trọng nhau trong quan hệ vợ chồng đứng đắn.",
      "Tạo không khí yêu thương cởi mở, thanh khiết trong gia đình.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Phương thế siêu nhiên hiệu nghiệm giúp ta sống trong sạch là những gì?",
    options: [
      "Tham dự các Bí tích, nhất là Bí tích Thánh Thể và Bí tích Giao Hòa.",
      "Yêu mến Đức Trinh nữ Maria.",
      "Tham gia các hoạt động tông đồ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Điều Răn nào dạy ta tôn trọng của cải người khác trong hành động cũng như trong tư tưởng?",
    options: [
      "Điều Răn thứ 8.",
      "Điều Răn thứ 10.",
      "Điều Răn thứ 7.",
      "Chỉ có b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Điều Răn nào dạy ta tôn trọng sự thật và danh giá người khác?",
    options: [
      "Điều Răn thứ 2.",
      "Điều Răn thứ 4.",
      "Điều Răn thứ 8.",
      "Điều Răn thứ 10.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Khi nào chúng ta lỗi Điều Răn thứ 7 đối với người nghèo?",
    options: [
      "Khi chúng ta có thể giúp đỡ mà bỏ qua.",
      "Khi chúng ta hoang phí.",
      "Khi chúng ta hà tiện.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Việc nào là không gây thiệt hại cho người khác trong hành động?",
    options: [
      "Gian lận, lường gạt.",
      "Vay mượn không trả, làm hư không đền.",
      "Trả lại của đã lượm được.",
      "Không trả tiền lương cân xứng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Tại sao phải tôn trọng sự thật?",
    options: [
      "Vì chính Chúa Giêsu là sự thật.",
      "Vì sự thật là nền tảng xã hội.",
      "Vì sự thật là căn bản cho việc giao tiếp giữa loài người.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Điều nào không phải là lỗi sự thật?",
    options: [
      "Chữa mình.",
      "Trung thực trong lời nói của mình.",
      "Ăn gian nói dối, lừa đảo.",
      "Không đủ can đảm nhận khuyết điểm.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Làm hại danh giá người khác là tội rất nặng, đó là những gì?",
    options: [
      "Nói hành.",
      "Vu oan, dị nghị.",
      "Cắt nghĩa xấu cho người khác.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giêsu có thái độ nào với Luật cũ?",
    options: [
      "Chúa Giêsu luôn tôn trọng Lề Luật.",
      "Chúa Giêsu luôn tuân giữ Lề Luật.",
      "Chúa Giêsu luôn dạy người ta tuân giữ Lề Luật.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Chúa Giêsu đã làm nhiều việc gì để chứng minh sứ mạng của Người?",
    options: [
      "Nhiều phép lạ.",
      "Nhiều việc đạo đức.",
      "Nhiều việc thiện nguyện.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Những ai tin vào Chúa Giêsu đều được chữa lành như là ai?",
    options: [
      "Người mù thấy được, người què đi được.",
      "Người câm nói được, người điếc nghe được.",
      "Các bệnh tật được chữa khỏi.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Giáo lý của Chúa có nhiều điều trái với ý nghĩ thế gian gây nên điều gì?",
    options: [
      "Gây nên xúc động trong dân chúng.",
      "Gây nên sự đồng cảm với những người lãnh đạo.",
      "Gây nên chướng tai gai mắt cho nhiều người.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Chúa Giêsu hay vạch trần cách sống thế nào của người Biệt Phái khiến họ ghét Người?",
    options: [
      "Cách sống tự mãn.",
      "Cách sống giả hình.",
      "Cách sống yêu thương, đạo đức.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Theo kế hoạch của Thiên Chúa đã định, Chúa Giêsu phải bị những gì?",
    options: [
      "Chúa Giêsu bị nộp.",
      "Chúa Giêsu bị đóng đinh vào thập giá.",
      "Nhưng Thiên Chúa đã cho Người sống lại.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giêsu đã làm gì để cứu chuộc loài người?",
    options: [
      "Chúa Giêsu đã hiến đời mình.",
      "Chúa Giêsu đã chịu đau khổ, chịu chết trên thập giá.",
      "Chúa Giêsu đã sống lại.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Công nghị Do thái nhờ tay ai kết án tử hình Chúa Giêsu?",
    options: [
      "Quan tổng trấn Philatô.",
      "Thượng tế Khanan.",
      "Ông Giuđa.",
      "Vua Hêrôđê.",
    ],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giêsu bị đóng đinh giữa hai tên trộm cướp tại đâu?",
    options: ["Làng Bêlem.", "Núi Tabor.", "Núi Sọ.", "Núi Ôliu."],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giêsu đã tắt thở vì cực hình tàn bạo vào lúc mấy giờ?",
    options: ["3 giờ.", "6 giờ.", "9 giờ.", "12 giờ."],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Sáng ngày thứ nhất trong tuần, những ai ra mồ và thất kinh khi thấy tảng đá lấp mồ đã lăn ra?",
    options: [
      "Những người Do thái đạo đức.",
      "Các Kinh sư và Biệt phái.",
      "Bà Maria Mađalêna và một bà Maria khác.",
      "Chỉ có a và b đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Ai đã báo với các bà 'Người đã sống lại như Người đã nói trước'?",
    options: [
      "Chúa Giêsu.",
      "Chúa Thánh Thần.",
      "Thiên thần.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Sau khi sống lại Chúa Giêsu đã làm gì?",
    options: [
      "Chúa Giêsu hiện ra dạy dỗ các môn đệ.",
      "Chúa Giêsu hiện ra an ủi các môn đệ.",
      "Chúa Giêsu sai các môn đệ đi rao giảng Tin mừng.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question:
      "Biến cố nào là trung tâm công cuộc cứu chuộc của Chúa Giêsu và cũng là mầu nhiệm trung tâm của cuộc sống người Kitô hữu?",
    options: [
      "Biến cố Chúa Giáng Sinh.",
      "Biến cố Chúa Giêsu chịu phép rửa.",
      "Biến cố Tử Nạn - Phục Sinh.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Khi sống với các Tông đồ, Chúa Giêsu nhiều lần nói về ai?",
    options: [
      "Đấng Tạo dựng.",
      "Ngôn sứ Môsê.",
      "Chúa Thánh Thần.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Thánh Thần được Chúa Giêsu ban vào lúc nào?",
    options: [
      "Vào buổi chiều Phục sinh.",
      "Vào ngày lễ Ngũ Tuần.",
      "Vào ngày Chúa Giêsu lên trời.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Từ ngày Chúa Giêsu đổ tràn đầy Chúa Thánh Thần trên các Tông đồ, Chúa Thánh Thần đã làm gì cho Hội Thánh?",
    options: [
      "Chúa Thánh Thần thánh hóa Hội Thánh.",
      "Chúa Thánh Thần hướng dẫn Hội Thánh.",
      "Chúa Thánh Thần gìn giữ và canh tân Hội Thánh.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Chúa Thánh Thần nhắc lại và giúp các Tông đồ hiểu rõ hơn những điều gì?",
    options: [
      "Những điều Chúa Giêsu đã dạy.",
      "Về thân thế và sự nghiệp của Chúa Giêsu.",
      "Về cái chết ô nhục trên thập giá và sự sống lại vinh quang của Ngài.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Thánh Thần đã làm cho các Tông đồ trở nên thế nào?",
    options: [
      "Mạnh dạn trong đức tin.",
      "Can đảm rao giảng Chúa Kitô chịu đóng đinh và sống lại, bất chấp mọi nguy hiểm.",
      "Sống đúng bản tính nhút nhát của mình.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Ai đã thánh hóa, canh tân và hiệp nhất mọi thành phần trong Hội Thánh?",
    options: [
      "Chúa Cha.",
      "Chúa Giêsu.",
      "Chúa Thánh Thần.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Chúa Thánh Thần ban cho người này ơn khôn ngoan, người kia ơn tiên tri, người khác ơn làm phép lạ... để họ làm gì?",
    options: [
      "Để vinh danh chính bản thân mình.",
      "Để họ được khen ngợi.",
      "Để họ phục vụ Hội Thánh.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Chúa Thánh Thần thánh hóa và làm cho người tín hữu trở nên chứng nhân của ai?",
    options: ["Hội Thánh.", "Chúa Kitô.", "Các Tông đồ.", "Cả a, b và c đúng."],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao dân Ítraen bị phế bỏ?",
    options: [
      "Vì dân Ítraen mọi rợ.",
      "Vì dân Ítraen quá nhỏ bé, ít ỏi.",
      "Vì dân Ítraen không đi đúng đường lối của Thiên Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Khởi đầu rao giảng Tin mừng, Chúa Giêsu đã chọn 12 Tông đồ và đã chọn ai làm đầu?",
    options: ["Gioan.", "Phêrô.", "Phaolô.", "Giacôbê."],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Gọi Hội Thánh là mầu nhiệm vì cùng với tổ chức bên ngoài, Hội Thánh còn có sức sống bên trong bắt nguồn từ đâu?",
    options: [
      "Từ Hội Thánh.",
      "Từ mọi sinh hoạt của Hội Thánh.",
      "Từ Chúa Ba Ngôi.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao ta biết Hội Thánh là Duy nhất?",
    options: [
      "Vì Chúa Kitô chỉ thiết lập một Hội Thánh.",
      "Vì các tín hữu đều tuyên xưng một đức tin, cùng tham dự việc phụng thờ Thiên Chúa.",
      "Vì các tín hữu cùng tham dự việc phụng thờ Thiên Chúa, cùng tuân phục Đức Giáo hoàng và hiệp nhất với nhau trong tình huynh đệ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Người tín hữu phải sống đặc tính Duy nhất như thế nào?",
    options: [
      "Phải sống phù hợp với giáo lý của Hội Thánh.",
      "Phải cầu nguyện và sống hiệp nhất.",
      "Đồng tâm nhất trí tham gia các sinh hoạt trong giáo phận, giáo xứ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao ta biết Hội Thánh là Thánh thiện?",
    options: [
      "Vì Hội Thánh có Chúa Kitô là đầu.",
      "Vì Hội Thánh có Chúa Thánh Thần gìn giữ và thánh hóa.",
      "Vì Hội Thánh có các phương tiện nên thánh và có các hoa trái thánh thiện.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao ta biết Hội Thánh là Công giáo?",
    options: [
      "Vì Hội Thánh được Chúa Kitô thiết lập.",
      "Vì Hội Thánh có Chúa Kitô là đầu.",
      "Vì Hội Thánh nhận mọi người ở mọi thời đại.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao ta biết Hội Thánh là Tông truyền?",
    options: [
      "Vì giáo lý đức tin do các tông đồ truyền lại.",
      "Vì phẩm trật do các tông đồ truyền lại.",
      "Vì sự kế vị liên tục do các tông đồ truyền lại.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chức vụ Ngôn sứ là gì?",
    options: ["Rao giảng.", "Làm phép lạ.", "Tế lễ.", "Cả a, b và c đúng."],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Người tín hữu trong Hội Thánh tham dự chức vụ Ngôn sứ khi lãnh nhận Bí tích gì?",
    options: [
      "Bí tích Thánh Thể.",
      "Bí tích Thêm Sức.",
      "Bí tích Rửa Tội.",
      "Chỉ b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Người tín hữu trong Hội Thánh thi hành chức vụ Ngôn sứ như thế nào?",
    options: [
      "Mạnh dạn phổ biến giáo lý cho người khác.",
      "Luôn sống điều mình tin.",
      "Can đảm tỏ mình là người có đạo.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chức vụ Tư tế là gì?",
    options: [
      "Thờ phượng.",
      "Làm phép lạ.",
      "Giảng dạy.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Chức tư tế phổ quát ban cho người tín hữu khi họ lãnh nhận Bí tích gì?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Thánh Thể.",
      "Bí tích Truyền Chức Thánh.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Người tín hữu trong Hội Thánh thi hành chức vụ tư tế khi nào?",
    options: [
      "Khi họ cộng tác dâng thánh lễ.",
      "Khi họ lãnh nhận các Bí tích.",
      "Khi họ cầu nguyện và tạ ơn.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Người tín hữu sống chứng tá thánh thiện, sống bác ái yêu thương là lúc họ sống chức vụ gì?",
    options: [
      "Chức vụ Ngôn sứ.",
      "Chức vụ Tư tế.",
      "Chức vụ Vương giả.",
      "Cả a, b và c đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chức vụ Vương giả là chức vụ thống trị trong tinh thần gì?",
    options: [
      "Tinh thần yêu thương.",
      "Tinh thần phục vụ.",
      "Tinh thần gia trưởng.",
      "Tinh thần cai trị.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Khi người tín hữu làm cho mọi công việc trần thế thấm nhuần tinh thần Chúa Kitô, đó là lúc họ sống chức vụ gì?",
    options: [
      "Chức vụ Ngôn sứ.",
      "Chức vụ Tư tế.",
      "Chức vụ Vương giả.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Đức Maria được cứu độ nhờ công nghiệp của Chúa Giêsu một cách đặc biệt. Mẹ được Thiên Chúa gìn giữ khỏi vướng tội gì?",
    options: ["Tội nhẹ.", "Tội trọng.", "Tội nguyên tổ.", "Cả a, b và c đúng."],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Đức Maria đã tham dự việc cứu độ của Chúa Giêsu bằng những hành động nào?",
    options: [
      "Mẹ đón nhận ý Chúa trong biến cố truyền tin.",
      "Mẹ cưu mang, nuôi dưỡng, dạy dỗ Chúa Giêsu.",
      "Mẹ lắng nghe và thi hành Lời Chúa cùng đã hiệp thông với những đau khổ của Con Mẹ trên thập giá.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ta phải làm gì để tôn kính và yêu mến Mẹ Maria?",
    options: [
      "Phải noi theo đức tin, đức cậy, đức mến của Mẹ.",
      "Siêng năng lần hạt Mân Côi.",
      "Sốt sắng mừng lễ Mẹ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Noi theo đức tin, đức cậy, đức mến của Mẹ, nghĩa là gì?",
    options: [
      "Luôn vâng theo ý Chúa.",
      "Luôn sống khiêm hạ phục vụ.",
      "Luôn suy gẫm Lời Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Năm phụng vụ là thời gian một năm, trong đó Hội Thánh mừng điều gì?",
    options: [
      "Hội Thánh mừng các biến cố trọng đại cuộc đời Chúa Giêsu.",
      "Hội Thánh tôn kính Đức Mẹ.",
      "Hội Thánh tôn kính thánh Giuse và các thánh.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Năm Phụng vụ có mục đích giúp người tín hữu điều gì?",
    options: [
      "Giúp các tín hữu mừng lễ cách long trọng bề ngoài.",
      "Giúp các tín hữu tổ chức thánh lễ cách sốt sắng, đông đảo.",
      "Giúp các tín hữu hiểu và sống các mầu nhiệm cách thiết thực hơn.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Ơn Chúa là sự sống và sức mạnh ai ban để ta sống hạnh phúc đời này và đời sau?",
    options: ["Thiên Chúa.", "Hội Thánh.", "Cha mẹ.", "Cả a, b và c đúng."],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Điều gì là dấu chỉ bên ngoài Chúa dùng để diễn tả và thông ban ơn bên trong cho loài người?",
    options: ["Ân sủng.", "Bí tích.", "Phép lạ.", "Lời Chúa."],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Dấu chỉ bên ngoài của Bí tích là những gì?",
    options: ["Thể chất.", "Cử chỉ.", "Lời đọc.", "Cả a, b và c đúng."],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Bí tích nào có thể được lãnh nhận nhiều lần trong số các Bí tích sau?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Hôn Phối.",
      "Bí tích Truyền Chức Thánh.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích nào tha tội nguyên tổ (tội tổ tông) cho ta?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Hôn Phối.",
      "Bí tích Truyền Chức Thánh.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Rửa Tội ban cho chúng ta những ơn nào?",
    options: [
      "Tha tội tổ tông và tội riêng.",
      "Làm cho ta trở thành con cái Chúa.",
      "Làm cho ta trở thành con cái Hội Thánh.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Người lãnh nhận Bí tích Rửa Tội thề hứa từ bỏ những gì?",
    options: [
      "Xa lánh tội lỗi.",
      "Từ bỏ những cái thuộc về ma quỷ.",
      "Từ bỏ ma quỷ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Người lãnh nhận Bí tích Rửa Tội thề hứa tin những gì?",
    options: [
      "Tin theo Chúa Kitô và tuân giữ lề luật của Người.",
      "Tin theo ông Môsê và tuân giữ lề luật đã viết trong Thánh Kinh Cựu Ước.",
      "Tin theo các thiên thần hướng dẫn.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Bí tích nào tăng cường đời sống siêu nhiên, gắn bó ta cách mật thiết với Hội Thánh hơn và thúc giục ta làm việc tông đồ truyền giáo?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Hôn Phối.",
      "Bí tích Thánh Thể.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Ngày lễ Ngũ Tuần, ai liên kết các tông đồ thành một tập thể khắng khít và thông ban lòng can đảm để rao truyền Chúa Kitô?",
    options: [
      "Chúa Cha.",
      "Chúa Giêsu.",
      "Chúa Thánh Thần.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Khi lãnh nhận Bí tích Thêm Sức, người tín hữu có những nghĩa vụ nào?",
    options: [
      "Thường xuyên cầu nguyện với Chúa Thánh Thần và theo sự hướng dẫn của Người.",
      "Cầu nguyện và tích cực tham gia các sinh hoạt tông đồ truyền giáo.",
      "Sống chứng nhân.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích cần thiết cho đời sống đời đời là Bí tích nào?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Thánh Thể.",
      "Bí tích Giải Tội.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích cao trọng nhất là Bí tích nào?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Thánh Thể.",
      "Bí tích Giải Tội.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Việc Chúa Giêsu biến bánh rượu nên Mình Máu Người làm lương thực nuôi sống phần hồn ta, gọi là Bí tích gì?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Thánh Thể.",
      "Bí tích Giải Tội.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Ta phải kính thờ Chúa Giêsu ngự trong Bí tích Thánh Thể thế nào?",
    options: [
      "Siêng năng tham dự Thánh Lễ và hiệp lễ sốt sắng.",
      "Năng đến kính viếng, tôn thờ.",
      "Giữ sự nghiêm trang đứng đắn trong Nhà Thờ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ai ngự thật trong Bí tích Thánh Thể?",
    options: ["Chúa Cha.", "Chúa Giêsu.", "Chúa Thánh Thần.", "Thiên thần."],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Trong mỗi hình Bánh Rượu đã được truyền phép, dù nhỏ bé, cũng có toàn vẹn Chúa Giêsu. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Thánh lễ là Hy Tế Tạ Ơn của ai nhờ tay linh mục hợp cùng toàn thể dân Chúa mà dâng mình cho Chúa Cha?",
    options: ["Thượng tế Caipha.", "Tư tế Aharon.", "Chúa Giêsu.", "Linh mục."],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Không kể phần nhập lễ và kết lễ, Thánh Lễ gồm hai phần chính. Đó là những phần nào?",
    options: [
      "Phần Phụng vụ Lời Chúa.",
      "Phần Phụng vụ Thánh Thể.",
      "Phần Hát xứng.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Các bài đọc Thánh Kinh, lời nguyện tín hữu thuộc phần Phụng vụ nào?",
    options: [
      "Phần Phụng vụ Lời Chúa.",
      "Phần Phụng vụ Thánh Thể.",
      "Phần Hát xứng.",
      "Chỉ có a và b đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Việc gì không thuộc phần Phụng vụ Thánh Thể?",
    options: [
      "Kinh nguyện Thánh Thể.",
      "Hiệp lễ.",
      "Bài giảng.",
      "Chuẩn bị lễ vật.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ai có quyền cử hành Thánh Lễ?",
    options: [
      "Các tu sĩ nam nữ.",
      "Những người có chức Linh mục.",
      "Các giáo dân.",
      "Cả a, b và c đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Khi tham dự Thánh Lễ, chúng ta phải có những tâm tình nào?",
    options: [
      "Tâm tình ngợi khen, cảm tạ.",
      "Tâm tình xin ơn tha thứ.",
      "Cầu khẩn mọi ơn lành hồn xác.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Khi tham dự Thánh Lễ, người tín hữu phải hợp lòng hợp ý với chủ tế và cộng đoàn như thế nào?",
    options: [
      "Tham dự cách ý thức.",
      "Tham dự cách linh động.",
      "Tham dự cách thành kính.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Tham dự Thánh lễ cách hoàn hảo là khi người tín hữu hiệp lễ. Việc hiệp lễ có những hiệu quả nào?",
    options: [
      "Giúp ta kết hợp mật thiết với Chúa Giêsu và hợp nhất với nhau.",
      "Xóa bỏ tội nhẹ và gia tăng ơn thánh hóa.",
      "Thêm sức cho ta chống trả các cám dỗ và đảm bảo cho ta được sống đời đời.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Điều kiện tiên quyết để được hiệp lễ là gì?",
    options: [
      "Sạch tội trọng.",
      "Sạch tội nhẹ.",
      "Làm việc bác ái.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Để tôn kính Bí tích Thánh Thể, người tín hữu trước khi rước lễ phải kiêng mọi thức ăn, thức uống bao lâu?",
    options: [
      "Khoảng 30 phút đồng hồ.",
      "Khoảng một giờ đồng hồ.",
      "Khoảng hai giờ đồng hồ.",
      "Không cần thiết.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Điều Răn Hội Thánh có qui định phải rước Mình Thánh Chúa trong mùa nào?",
    options: ["Mùa Chay.", "Mùa Vọng.", "Mùa Giáng sinh.", "Mùa Phục sinh."],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Sự sống siêu nhiên thường bị tội lỗi và nết xấu làm tổn thương. Để cứu vãn chúng ta phải lãnh nhận Bí tích gì?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Thánh Thể.",
      "Bí tích Giải Tội.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Chúa Giêsu thổi hơi trên các Tông đồ và phán: 'Anh em tha tội cho ai thì người ấy được tha'. Đây là lúc Chúa Giêsu lập Bí tích gì?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Thánh Thể.",
      "Bí tích Giải Tội.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Cốt yếu của Bí tích Giải Tội được thể hiện qua Hội Thánh và tâm hồn sám hối của tội nhân là gì?",
    options: [
      "Cuộc Tử Nạn của Chúa Giêsu.",
      "Việc Nhập Thể của Chúa Giêsu.",
      "Lòng thương xót của Thiên Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Giêsu đã lập Bí tích Giải Tội để làm gì?",
    options: [
      "Tha tội ta phạm từ ngày lãnh nhận Bí tích Rửa Tội về sau.",
      "Giao hòa ta cùng với Thiên Chúa.",
      "Giao hòa ta cùng với Hội Thánh.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Những tín hữu đã phạm tội trọng thì không cần phải lãnh nhận Bí tích Giải Tội. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Nếu chỉ mắc tội nhẹ mà lãnh Bí tích Giải Tội thì được ơn ích gì?",
    options: [
      "Được thêm lòng sốt sắng.",
      "Nhiều lợi ích thiêng liêng.",
      "Được tha tội trọng sau này.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Muốn lãnh nhận Bí tích Giải Tội, chúng ta cần phải làm gì?",
    options: [
      "Phải xét mình.",
      "Phải ăn năn dốc lòng chừa.",
      "Phải xưng tội và làm việc đền tội.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Thành thật thú nhận tội đã xét thấy với linh mục giải tội là việc nào trong việc lãnh nhận Bí tích Giải Tội?",
    options: ["Xét mình.", "Ăn năn dốc lòng chừa.", "Xưng tội.", "Đền tội."],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Điều Răn Hội Thánh qui định thế nào về việc xưng tội?",
    options: [
      "Xưng tội khi mắc tội trọng.",
      "Xưng tội mỗi khi có thể.",
      "Xưng tội mỗi năm ít là một lần.",
      "Xưng tội ngay cả tội nhẹ.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Giêsu lập Bí tích Xức Dầu Bệnh Nhân để làm gì?",
    options: [
      "Để chuẩn bị cho bệnh nhân bước vào đời sau.",
      "Để ban ơn nâng đỡ bệnh nhân phần hồn.",
      "Để ban ơn nâng đỡ bệnh nhân phần xác.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Bí tích gì đem lại cho bệnh nhân sự an ủi và những trợ giúp thiêng liêng cần thiết trong cơn thử thách?",
    options: [
      "Bí tích Rửa Tội.",
      "Bí tích Thêm Sức.",
      "Bí tích Xức Dầu Bệnh Nhân.",
      "Bí tích Truyền Chức Thánh.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Nên lãnh nhận Bí tích Xức Dầu Bệnh Nhân khi nào để được hưởng nhiều hiệu quả hơn?",
    options: [
      "Khi còn tỉnh táo.",
      "Khi đã hôn mê.",
      "Khi đã chết.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Chúa Giêsu đã lập Bí tích Truyền Chức Thánh để thánh hiến những vị nào?",
    options: ["Phó tế.", "Linh mục.", "Giám mục.", "Cả a, b và c đúng."],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Tác vụ thánh của Bí tích Truyền Chức Thánh là những gì?",
    options: [
      "Phục vụ dân Chúa.",
      "Tế lễ và cử hành Bí tích.",
      "Rao giảng Lời Chúa.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí Tích Hôn Phối là Bí tích Chúa Giêsu đã lập để làm gì?",
    options: [
      "Kết hợp một nam một nữ thành vợ chồng trước mặt Chúa và Hội Thánh.",
      "Ban ơn đặc biệt giúp họ sống chu toàn nghĩa vụ.",
      "Giúp đôi bạn thăng tiến trong đời sống xã hội.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Hôn nhân Công giáo có mục đích gì?",
    options: [
      "Giúp phát triển tình yêu, tương trợ, bổ túc cho nhau trong mọi lãnh vực.",
      "Hướng đến việc sinh sản.",
      "Giáo dục con cái.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Hôn nhân Công Giáo có những đặc tính gì?",
    options: [
      "Một vợ một chồng.",
      "Bất khả phân ly.",
      "Tự do ly hôn.",
      "Chỉ có a và b đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Dây hôn phối chỉ bị cắt đứt khi nào?",
    options: [
      "Khi một trong hai người qua đời.",
      "Khi không còn yêu nhau nữa.",
      "Khi không có con cái.",
      "Khi có người yêu mới.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Đâu là nghi thức chính yếu của việc kết hôn Công Giáo?",
    options: [
      "Là sự bày tỏ tự do ưng thuận kết hôn của đôi bạn trước sự chứng hôn của Hội Thánh.",
      "Là lời chúc lành của linh mục.",
      "Là việc trao nhẫn cưới.",
      "Là thánh lễ long trọng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Sự bày tỏ tự do ưng thuận kết hôn nghĩa là gì?",
    options: [
      "Họ không bị ép buộc bất cứ vì lý do gì.",
      "Họ không bị ngăn cản bởi luật tự nhiên.",
      "Họ không bị ngăn cản bởi luật Hội Thánh.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ai là thừa tác viên cử hành Bí tích Hôn Phối?",
    options: [
      "Linh mục chủ tế.",
      "Đôi nam nữ.",
      "Cộng đoàn dân Chúa.",
      "Phó tế chủ sự chứng hôn.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Để Bí tích Hôn Phối thành sự và hữu hiệu cần có những điều kiện gì?",
    options: [
      "Phải là hai Kitô hữu.",
      "Có sự tự do ưng thuận.",
      "Không mắc một ngăn trở tiêu hôn nào.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Chỉ cần bày tỏ lời tự do ưng thuận kết hôn thì đã đủ để cho bí tích thành sự. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Ngăn trở tiêu hôn là những cản trở làm cho việc kết hôn ra vô hiệu, như là những ngăn trở nào?",
    options: [
      "Ngăn trở về tuổi.",
      "Ngăn trở về họ hàng, hôn phối cũ.",
      "Ngăn trở về chức thánh hoặc lời khấn.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Để kết hôn thành sự, Giáo Hội qui định độ tuổi thế nào (GL 1083)?",
    options: [
      "Nam phải đủ 14 tuổi, nữ phải đủ 12 tuổi.",
      "Nam phải đủ 16 tuổi, nữ phải đủ 14 tuổi.",
      "Nam phải đủ 18 tuổi, nữ phải đủ 16 tuổi.",
      "Tuổi nào cũng được.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Tại Việt Nam, tuổi kết hôn là bao nhiêu?",
    options: [
      "Nam phải đủ 14 tuổi, nữ phải đủ 12 tuổi.",
      "Nam phải đủ 16 tuổi, nữ phải đủ 14 tuổi.",
      "Nam phải đủ 18 tuổi, nữ phải đủ 16 tuổi.",
      "Nam phải đủ 20 tuổi, nữ phải đủ 18 tuổi.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Một trong những ngăn trở của Bí tích Hôn Phối là do bất lực. Bất lực nghĩa là gì?",
    options: [
      "Không muốn có con.",
      "Vô sinh.",
      "Không thể giao hợp.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Ngăn trở do dây hôn phối cũ còn ràng buộc. Khi nào thì ngăn trở này chấm dứt?",
    options: [
      "Người phối ngẫu chết.",
      "Hôn nhân thành sự nhưng chưa hoàn hợp, được Đức Giáo Hoàng đoạn tiêu.",
      "Hôn nhân giữa hai người chưa rửa tội được đoạn tiêu do đặc ân Phaolô.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ngăn trở do họ máu (huyết tộc): Câu nào không đúng?",
    options: [
      "Cấm kết hôn trong các đời thuộc hàng dọc.",
      "Hàng ngang thì được kết hôn khi đã quá 3 đời, nếu có phép chuẩn của Hội Thánh.",
      "Hàng ngang thì được kết hôn khi đã quá 4 đời.",
      "Ông có thể lấy chắt.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Ngăn trở do họ kết hôn thì chỉ cấm kết hôn hàng dọc. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Các loại họ thiêng liêng, kết nghĩa không cản trở việc kết hôn. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Ngoài những ngăn trở trên còn có những ngăn trở nào làm cho hôn phối vô hiệu?",
    options: [
      "Ngăn trở vì có chức thánh hoặc lời khấn trọn trong dòng tu.",
      "Ngăn trở do mưu sát người phối ngẫu.",
      "Ngăn trở dưỡng hệ, ngăn trở về công hạnh.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Hội Thánh không có quyền tháo gỡ dây hôn phối khi đã thành sự và hoàn hợp. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Những ngăn trở thuộc luật tự nhiên nào Hội Thánh không có quyền miễn chuẩn?",
    options: [
      "Do bất lực.",
      "Do đã kết hôn.",
      "Do có họ máu hàng dọc, do có họ máu hai bậc hàng ngang.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Những ngăn trở chỉ do luật Hội Thánh mà thôi thì Hội Thánh có quyền miễn chuẩn, gồm những ngăn trở nào?",
    options: [
      "Về tuổi tối thiểu.",
      "Về họ máu ba bậc trở đi theo hàng ngang, về họ kết bạn, về tội ác.",
      "Về chức thánh, về lời khấn, về công hạnh, về khác tôn giáo.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Hội Thánh không chấp nhận bất cứ hình thức hủy diệt sự sống nào, đặc biệt là phá thai. Đúng hay sai?",
    options: ["Đúng.", "Sai."],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Hội Thánh không tán thành phương pháp điều hòa sinh sản nhân tạo như là gì?",
    options: [
      "Thuốc ngừa thai.",
      "Dụng cụ tránh thai.",
      "Triệt sản.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Điều gì không phải là 4 vấn đề sau hết của cuộc đời?",
    options: ["Thiên đàng và hỏa ngục.", "Phán xét.", "Hạnh phúc.", "Chết."],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Xét theo đức tin, điều nào sau đây không đúng về cái chết?",
    options: [
      "Chết là tham dự vào cuộc Tử nạn của Chúa Giêsu để được Phục sinh với Người.",
      "Chết là hết.",
      "Chết là ngưỡng cửa bước vào đời sau.",
      "Chết là hậu quả của tội.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Dưới ánh sáng đức tin, chết là kết thúc thời gian gì Chúa dành cho mỗi người?",
    options: [
      "Thời gian vui vẻ.",
      "Thời gian hạnh phúc.",
      "Thời gian cứu độ.",
      "Thời gian lữ thứ.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Sau khi chết, mỗi người đều bị xét xử về các việc lành dữ đã làm khi còn sống, để nhận lấy điều gì?",
    options: [
      "Số phận đời đời.",
      "Hạnh phúc.",
      "Đau khổ.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Thánh Kinh xác quyết ai sẽ phán xét chung toàn thể loài người vào ngày thế mạt?",
    options: [
      "Chúa Giêsu Kitô.",
      "Các thiên thần.",
      "Các tông đồ.",
      "Cả a, b và c đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Hội Thánh tin linh hồn những người đã chết thế nào sẽ được sống hạnh phúc với Chúa Kitô trong Nước Trời?",
    options: [
      "Những người đã được rửa tội và đã lãnh nhận Bí tích Thánh Thể.",
      "Những người đã được rửa tội và đã kết hôn hợp pháp.",
      "Những người đã chết trong ơn nghĩa Chúa và đã được thanh tẩy vẹn toàn.",
      "Cả a, b và c đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Những kẻ chết trong tình trạng tội lỗi nặng nề sẽ bị xa cách Chúa đời đời. Đó là hình phạt gì?",
    options: ["Thiên đàng.", "Luyện ngục.", "Hỏa ngục.", "Cả a, b và c đúng."],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Thánh Kinh mở ra trước mắt các tín hữu một thế giới mới. Trong thế giới ấy như thế nào?",
    options: [
      "Không còn cảnh chết chóc than vãn.",
      "Người lành được sống với Thiên Chúa là nguồn suối vô tận của bình an và thông hiệp.",
      "Cả vũ trụ vật chất cũng được biến đổi.",
      "Cả a, b và c đúng.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Trong khi chờ đợi Trời Mới Đất Mới, người tín hữu phải tích cực xây dựng thế giới này tốt đẹp hơn về những mặt nào?",
    options: ["Vật chất.", "Tinh thần.", "Tôn giáo.", "Cả a, b và c đúng."],
    answer: 3,
  },
  {
    section: "Phần Mở Đầu",
    question: "Thiên Chúa là Đấng nào?",
    options: [
      "Thiên Chúa hay còn gọi là Ông Trời, là Đấng dựng nên trời đất muôn vật, là Đấng ban hạnh phúc chân thật cho con người.",
      "Thiên Chúa là Đấng dựng nên trời đất muôn vật, là Đấng ban hạnh phúc chân thật cho con người.",
      "Thiên Chúa là Đấng dựng nên trời đất muôn vật, trong đó, con người là đỉnh cao của tạo dựng.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần Mở Đầu",
    question: "Loài người dựa vào đâu để tìm biết Thiên Chúa?",
    options: [
      "Loài người dựa vào hiểu biết của chính mình cùng sự hiểu biết mà niềm tin Tôn giáo mang lại.",
      "Loài người dựa vào hiểu biết của chính mình, cùng với sự hướng dẫn của khoa học và sự trợ giúp của niềm tin Tôn giáo.",
      "Loài người dựa vào trật tự trong vũ trụ, vào những khát vọng chân chính, vào tôn giáo, cách riêng đạo Công Giáo, mà nhận biết Thiên Chúa.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần Mở Đầu",
    question: "Thiên Chúa dùng cách thức nào để tỏ mình cho loài người?",
    options: [
      "Thiên Chúa dùng nhiều cách thức, nhưng cách rõ ràng nhất là Thánh Kinh.",
      "Thiên Chúa tỏ mình ra cho loài người qua Đức Giê-su là Con Một yêu dấu của Ngài.",
      "Thiên Chúa tỏ mình ra cho loài người qua các trật tự lạ lùng trong vũ trụ, và nhất là qua Đức Giê-su là Con Một yêu dấu của Ngài.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần Mở Đầu",
    question: "Thánh Kinh là gì?",
    options: [
      "Thánh Kinh là Lời của Thiên Chúa nói với con người. Thánh Kinh gồm 46 cuốn Cựu Ước và 27 cuốn Tân Ước.",
      "Thánh Kinh là bộ sách được linh ứng ghi chép ý định và hành động cứu chuộc loài người của Thiên Chúa. Thánh Kinh gồm 46 cuốn Cựu Ước và 27 cuốn Tân Ước.",
      "Thánh Kinh là bộ sách được linh ứng ghi chép ý định và hành động cứu chuộc loài người của Thiên Chúa. Thánh Kinh gồm 27 cuốn Cựu Ước và 46 cuốn Tân Ước.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần Mở Đầu",
    question: "Nội dung Thánh Kinh là gì?",
    options: [
      "Là chương trình và hành động cứu độ của Thiên Chúa được Chúa Giê-su thực hiện.",
      "Là chương trình và hành động cứu độ của Thiên Chúa được Chúa Giê-su thực hiện. Chương trình này trải dài suốt lịch sử loài người.",
      "Là chương trình và hành động cứu độ của Thiên Chúa được Chúa Giê-su thực hiện. Nhằm bày tỏ vinh quang của Thiên Chúa cho con người.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần Mở Đầu",
    question: "Ta phải đón nhận Thánh Kinh thế nào?",
    options: [
      "Ta phải đón nhận Thánh Kinh trong tâm tình vui mừng, tạ ơn.",
      "Ta phải đón nhận Thánh Kinh trong tâm tình vui mừng, tạ ơn. Đồng thời phải đọc và học hỏi, cùng giúp người khác hiểu về Lời của Thiên Chúa.",
      "Ta phải đón nhận Thánh Kinh trong tâm tình vui mừng, tạ ơn. Đồng thời, phải đọc và học hỏi, khám phá ra ý định của Thiên Chúa qua Lời của Ngài.",
      "Tất cả đều đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần Mở Đầu",
    question: "Ta phải đọc Thánh Kinh thế nào?",
    options: [
      "Ta phải đọc Thánh Kinh trong đức tin với tâm tình khiêm tốn, đơn sơ, theo sự hướng dẫn của Hội Thánh.",
      "Ta phải đọc Thánh Kinh trong đức tin với tâm tình khiêm tốn, đơn sơ, theo sự hướng dẫn của Hội Thánh. Đồng thời khám phá nơi đó ý định của Thiên Chúa.",
      "Ta phải đọc Thánh Kinh trong đức tin với tâm tình khiêm tốn, đơn sơ, theo sự hướng dẫn của Hội Thánh, trong ước muốn được dạy dỗ và sẵn sàng thực hiện điều Chúa dạy.",
      "Tất cả đều đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Trời đất muôn vật bởi đâu mà có?",
    options: [
      "Trời đất muôn vật do Đấng Tạo Hóa làm ra.",
      "Trời đất muôn vật bởi Thiên Chúa dựng nên.",
      "Trời đất muôn vật do tự nhiên mà có, được hình thành trải qua cả triệu triệu năm rồi tiến hóa dần.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Loài người là loài nào?",
    options: [
      "Loài người cũng là một loài động vật như bao loài động vật khác. Chỉ có điều, nó được dựng nên để làm bá chủ muôn loài.",
      "Loài người là loài có linh hồn và thể xác, Chúa dựng nên giống hình ảnh Người, cho làm chủ vũ trụ và hưởng hạnh phúc đời đời.",
      "Loài người cũng là một loài động vật như bao loài động vật khác, được dựng nên để làm chủ muôn loài nhờ trí khôn mà Tạo Hóa ban cho.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thiên Chúa đã ban cho nguyên tổ cuộc sống nào?",
    options: [
      "Thiên Chúa ban cho nguyên tổ một cuộc sống ngập tràn hạnh phúc, diễn tả qua hình ảnh 'Vườn địa đàng'.",
      "Thiên Chúa ban cho nguyên tổ một cuộc sống ngập tràn hạnh phúc. Các ngài được Chúa cho coi sóc và hướng dẫn muôn loài muôn vật.",
      "Thiên Chúa đã ban cho nguyên tổ cuộc sống được làm con Chúa và nhiều đặc ân khác.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Nguyên tổ có được hạnh phúc ấy mãi không?",
    options: [
      "Không. Vì nguyên tổ đã trái lệnh Chúa, nên mất hạnh phúc, chuốc lấy muôn vàn hậu quả tai hại cho mình và con cháu.",
      "Không. Vì các ngài đã chống đối Thiên Chúa.",
      "Không. Vì các ngài đã nghiêng về phe ma quỷ để chống đối Thiên Chúa.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tội là gì?",
    options: [
      "Tội là sự lỗi luật Chúa và Hội Thánh trong tư tưởng, lời nói, việc làm và những điều thiếu sót.",
      "Tội là phạm phải những điều xấu mà lương tâm không cho phép.",
      "Tội là phạm phải những điều xấu trong tư tưởng cũng như trong hành động, mà lương tâm không cho phép.",
      "Tất cả đều đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thiên Chúa có thái độ nào khi nguyên tổ phạm tội?",
    options: [
      "Thiên Chúa tỏ ra buồn bực, vì nguyên tổ đã không nghe theo lời của Ngài.",
      "Thiên Chúa tỏ ra buồn bực và quyết định cất đi khỏi họ những đặc quyền đặc lợi và đuổi họ ra khỏi vườn địa đàng.",
      "Thiên Chúa đã nghiêm phạt nguyên tổ, nhưng vẫn một lòng thương xót, hứa ban ơn cứu độ.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thiên Chúa đã bắt đầu công cuộc cứu chuộc thế nào?",
    options: [
      "Thiên Chúa đã lựa chọn Đa-vít làm người đứng đầu một dân tộc, dân mà sau này sẽ trở thành dân riêng của Người.",
      "Thiên Chúa đã lựa chọn Sa-lô-mon là con của Đa-vít làm vua và làm người đứng đầu dân riêng của Người.",
      "Thiên Chúa đã chọn Ab-ra-ham làm Tổ phụ dân riêng của Người.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thiên Chúa chọn gọi Mô-sê khi nào?",
    options: [
      "Khi dân Ít-ra-en làm nô lệ ở Ai-cập để giải phóng dân Người và đưa họ về đất hứa.",
      "Thiên Chúa đã gọi Mô-sê khi ông đang chăn chiên cho bố vợ tại núi Khô-rép.",
      "Thiên Chúa đã hiện ra với Mô-sê qua đám lửa cháy trong bụi gai, khi ông đang chăn chiên cho bố vợ tại núi Khô-rép.",
      "Tất cả đều đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Khi vào đất hứa, dân Ít-ra-en được hướng dẫn thế nào?",
    options: [
      "Khi vào đất hứa, Thiên Chúa đã chia đất cho dân theo từng chi tộc, rồi Ngài cắt đặt các thẩm phán để coi sóc họ.",
      "Khi vào đất hứa, chính Thiên Chúa hướng dẫn dân Người qua các thẩm phán rồi đến các vua mà nổi bật nhất là vua Đa-vít.",
      "Khi vào đất hứa, Thiên Chúa đã chia đất cho dân theo từng chi tộc, rồi chính Ngài trực tiếp coi sóc và hướng dẫn họ.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thiên Chúa hứa với Đa-vít điều gì?",
    options: [
      "Thiên Chúa hứa thiết lập cho Đa-vít một triều đại vững bền và một người trong dòng dõi ông sẽ làm vua mãi mãi. Đó là Đấng Cứu Thế.",
      "Thiên Chúa hứa với vua Đa-vít rằng Ngài sẽ ban cho ông ơn khôn ngoan, để ông có thể cai trị vương quốc của ông cho đến muôn đời.",
      "Thiên Chúa hứa với vua Đa-vít rằng Ngài sẽ ban cho ông ơn khôn ngoan để ông có thể cai trị, và triều đại của ông sẽ vững bền mãi mãi.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thiên Chúa đã ký kết gì với Ít-ra-en?",
    options: [
      "Thiên Chúa đã ký kết với Ít-ra-en một Điều Ước tại núi Si-nai, qua đó Ngài nhận họ làm dân riêng của Ngài.",
      "Thiên Chúa đã ký kết với Ít-ra-en một Giao Ước tại núi Si-nai.",
      "Thiên Chúa đã ký kết với Ít-ra-en một Điều Ước tại núi Si-nai, qua đó Ngài nhận họ làm dân riêng và hứa sẽ chăm sóc họ.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thiên Chúa cam kết những gì với Ít-ra-en?",
    options: [
      "Thiên Chúa cam kết nhận Ít-ra-en làm dân riêng của Người, chăm sóc và hướng dẫn vận mệnh toàn dân.",
      "Thiên Chúa cam kết sẽ cùng đi với dân, sẽ bảo vệ và che chở dân, cho dù dân có sai lỗi và phản bội Ngài.",
      "Thiên Chúa cam kết sẽ cùng đi với dân, sẽ bảo vệ và che chở dân. Và sau cùng, Ngài sẽ cho họ được vào Đất Hứa, hưởng hạnh phúc muôn đời.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ít-ra-en cam kết gì với Thiên Chúa?",
    options: [
      "Ít-ra-en cam kết sẽ không bao giờ bỏ Chúa và sẽ nguyện làm dân của Ngài suốt đời.",
      "Ít-ra-en cam kết sẽ không bao giờ bỏ Chúa và sẽ thực thi mọi điều Chúa truyền dạy cho dù phải đánh đổi cả mạng sống.",
      "Ít-ra-en cam kết tôn thờ Thiên Chúa là Chúa độc nhất và vâng giữ mọi luật Người truyền.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Luật Mô-sê được ghi chép ở đâu?",
    options: [
      "Luật Mô-sê được ghi chép trên 2 bia đá. Đó là những giới răn được gọi là Thập Điều hay Mười Điều Răn.",
      "Luật Mô-sê được ghi chép trên 2 bia đá mà chính Thiên Chúa đã ban cho dân Ngài.",
      "Luật Mô-sê được ghi chép trong Ngũ Thư, tức là 5 cuốn sách đầu của bộ Thánh Kinh, gồm: Khởi nguyên, Xuất hành, Dân số, Lê-vi và Thứ luật.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Luật Mô-sê gồm những gì?",
    options: [
      "Luật Mô-sê gồm những điều răn và giới luật, giúp cho con người thực thi những gì mà Thiên Chúa muốn họ phải làm.",
      "Luật Mô-sê gồm các giáo huấn, mệnh lệnh và ý định của Thiên Chúa, giúp dân biết cách tôn thờ Thiên Chúa, cư xử với tha nhân và chính mình.",
      "Luật Mô-sê gồm những điều răn và giới luật, giúp cho con người đi theo đường ngay lẽ phải, làm lành, lánh dữ và thực thi hết những gì Thiên Chúa muốn.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ngôn sứ là ai?",
    options: [
      "Ngôn sứ là những người được Thiên Chúa chọn để sai đi loan truyền Lời Chúa cho dân Người.",
      "Ngôn sứ hay còn gọi là Tiên tri, là người biết trước mọi điều trong tương lai.",
      "Ngôn sứ hay còn gọi là Tiên tri, là người biết trước mọi điều trong tương lai và thi hành nhiệm vụ theo những gì Thiên Chúa chỉ dạy.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Các Ngôn sứ đã nói gì với dân Chúa?",
    options: [
      "Các Ngôn sứ đã nhắc nhở cho dân nhớ các điều họ đã cam kết với Thiên Chúa trong giao ước và loan báo ơn cứu độ Thiên Chúa sẽ thực hiện qua Đấng Cứu Thế.",
      "Các Ngôn sứ đã khích lệ dân sống theo đường ngay nẻo chính. Đừng lo lắng sợ hãi, nhưng cứ đường lối Chúa mà đi.",
      "Các Ngôn sứ đã nói trước cho họ biết về tương lai của họ, đồng thời khích lệ dân sống theo đường ngay nẻo chính.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Thiên Chúa sai sứ thần Gáp-ri-en đến loan tin gì cho Đức Maria?",
    options: [
      "Thiên Chúa sai sứ thần Gáp-ri-en đến loan tin rằng: 'Bà sẽ được gọi là Con Đấng Tối Cao'.",
      "Thiên Chúa sai sứ thần Gáp-ri-en đến làng Na-da-rét loan báo cho Đức Maria: 'Này Bà sẽ thụ thai, sinh hạ một Con trai và đặt tên là Giê-su'.",
      "Thiên Chúa sai sứ thần Gáp-ri-en đến loan tin: 'Này Bà sẽ thụ thai, sinh hạ một Con trai và đặt tên là Giê-su. Và Bà sẽ được gọi là Con Đấng Tối Cao'.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Lễ Giáng sinh là lễ nào?",
    options: [
      "Lễ Giáng Sinh hay còn gọi là lễ No-en, là ngày sinh nhật của Chúa Giê-su – Đấng được gọi là Em-ma-nu-en.",
      "Lễ Giáng sinh là lễ người Ki-tô hữu mừng kỷ niệm Chúa Giê-su sinh ra ở Bê-lem trong nước Do-thái.",
      "Lễ Giáng Sinh hay còn gọi là lễ No-en, là ngày sinh nhật của Chúa Giê-su. Đây là ngày lễ trọng nhất của người Công Giáo.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Ta phải có tâm tình nào khi mừng lễ Giáng sinh?",
    options: [
      "Ta phải hân hoan vui mừng, vì đây là cơ hội để tổ chức lễ hội, là dịp quảng bá ý nghĩa của ngày lễ.",
      "Ta phải hân hoan vui mừng, vì đây là cơ hội để tổ chức lễ hội, là dịp quảng bá về ngày lễ, và cũng là dịp để vui chơi, mua sắm và tặng quà.",
      "Ta phải cảm mến sâu xa tình Chúa yêu ta và biết yêu thương mọi người.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Gia đình Na-da-rét gồm những ai?",
    options: [
      "Gia đình Na-da-rét gồm Thánh Mô-sê, Mẹ Maria và Chúa Giê-su.",
      "Gia đình Na-da-rét gồm Thánh Mô-sê, Mẹ Maria và Chúa Giê-su cùng những người bà con họ hàng thân thuộc.",
      "Gia đình Na-da-rét gồm Thánh Mô-sê, Mẹ Maria và Chúa Giê-su, các anh em của Người cùng những người bà con họ hàng thân thuộc.",
      "Gia đình Na-da-rét gồm thánh Giu-se, Mẹ Maria và Chúa Giê-su.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giê-su làm gì ở Na-da-rét?",
    options: [
      "Chúa Giê-su giảng dạy cho dân chúng và làm các phép lạ tại đó.",
      "Ngoài thời giờ học hành, Chúa Giê-su còn giảng dạy cho dân chúng và làm các phép lạ tại đó.",
      "Ngoài thời giờ học hành và tham dự các cử hành phụng vụ của người Do-thái, Chúa Giê-su còn giảng dạy và làm phép lạ.",
      "Chúa Giê-su luôn cầu nguyện, học hỏi Thánh Kinh, làm việc, vâng lời Đức Maria và thánh Giu-se.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Đời sống ẩn dật của Chúa Giê-su tại Na-da-rét dạy ta điều gì?",
    options: [
      "Dạy ta biết yêu cuộc sống bình dị, đơn giản, yêu lao động, chu toàn bổn phận đối với Thiên Chúa, cha mẹ và mọi người.",
      "Dạy chúng ta biết sống chậm lại, sống bình dị và đơn giản.",
      "Dạy chúng ta biết sống chậm lại, sống bình dị, đơn giản, biết mở lòng ra và sống yêu thương hết mọi người.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Gioan Tẩy Giả là ai?",
    options: [
      "Gioan Tẩy Giả là người anh họ của Chúa Giê-su. Ông hoạt động với tư cách là một nhà cách mạng, giải phóng dân tộc.",
      "Gioan Tẩy Giả hay còn gọi với tên khác là Gioan Tiền Hô.",
      "Gioan Tẩy Giả là một vị Ngôn sứ, ông đến để dọn đường cho Chúa.",
      "Gioan Tẩy Giả là ngôn sứ cuối cùng của thời Cựu Ước, được Thiên Chúa chọn để dọn đường cho Chúa Cứu Thế.",
    ],
    answer: 3,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Khi bắt đầu rao giảng, Chúa Giê-su loan báo điều gì?",
    options: [
      "Chúa Giê-su loan báo rằng: 'Mọi người hãy ăn năn sám hối và tin vào Tin Mừng'.",
      "Chúa Giê-su loan báo rằng: 'Thời kỳ đã mãn, hay mau ăn năn thống hối mà sửa lại cách sống, kẻo phải chết'.",
      "Chúa Giê-su loan báo rằng: 'Thời kỳ đã mãn và Nước Thiên Chúa đã gần đến rồi. Anh em phải sám hối và tin vào Tin Mừng'.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giê-su đã giảng về Nước Thiên Chúa như thế nào?",
    options: [
      "Ngài nói về Nước Thiên Chúa như là một vương quốc 'đáng sống', nơi ngập tràn hạnh phúc.",
      "Ngài nói về Nước Thiên Chúa như là một vương quốc 'đáng sống', nơi ngập tràn hạnh phúc, sẽ không còn tranh giành, cướp bóc, đau khổ và nước mắt.",
      "Ngài nói về Nước Thiên Chúa như là một nơi ngập tràn hạnh phúc, sẽ không còn tranh giành, cướp bóc, đau khổ và nước mắt.",
      "Người đã dùng nhiều dụ ngôn để nói về Nước Thiên Chúa như: kho báu, mẻ lưới, men trong bột, hạt cải…",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Mầu nhiệm Một Chúa Ba Ngôi dạy ta điều gì?",
    options: [
      "Mầu nhiệm Một Chúa Ba Ngôi dạy ta biết có một Thiên Chúa mà Người có Ba Ngôi.",
      "Mầu nhiệm Một Chúa Ba Ngôi dạy ta biết có một Thiên Chúa mà Người có Ba Ngôi: Ngôi thứ Nhất là Cha, Ngôi thứ Hai là Con, Ngôi thứ Ba là Thiên Thần.",
      "Mầu nhiệm Một Chúa Ba Ngôi dạy ta biết có một Thiên Chúa mà Người có Ba Ngôi: Ngôi thứ Nhất là Cha, Ngôi thứ Hai là Con, Ngôi thứ Ba là Thánh Thần.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ta phải làm gì đối với Thiên Chúa Ba Ngôi?",
    options: [
      "Ta phải tin cậy kính mến, thờ lạy và biết ơn, nhất là phải năng cầu nguyện với Chúa Ba Ngôi mỗi ngày.",
      "Ta phải tin cậy kính mến, thờ lạy và biết ơn, nhất là phải năng cầu nguyện với Chúa Ba Ngôi mỗi ngày. Đồng thời ý thức rằng, mình làm tất cả mọi việc đều nhân danh Thiên Chúa Ba Ngôi.",
      "Cả A và B.",
      "Ta phải tin cậy kính mến, thờ lạy và biết ơn, nhất là phải năng tưởng nhớ Chúa Ba Ngôi ngự trong lòng ta như Đền thờ Người.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Thờ phượng Thiên Chúa là gì?",
    options: [
      "Là nhận biết Chúa là Cha đã sáng tạo và gìn giữ ta cùng trời đất muôn vật, nên ta phải hết lòng thờ kính, mến yêu và phụng sự Người.",
      "Là hành động tôn thờ mà chúng ta dành cho Ngài.",
      "Là hành động tôn thờ mà chúng ta dành cho Ngài. Đồng thời, phải hết lòng kính thờ, mến yêu và phụng sự Ngài trên hết mọi sự.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Điều răn thứ nhất dạy ta sự gì?",
    options: [
      "Dạy ta thờ phượng một Thiên Chúa và chỉ một mình Ngài mà thôi.",
      "Dạy ta thờ phượng một Thiên Chúa là Chúa Cha, Chúa Con và Chúa Thánh Thần và chỉ một mình Ngài mà thôi.",
      "Dạy ta thờ phượng một Thiên Chúa là Chúa Cha, Chúa Con và Các Thiên Thần và chỉ phụng sự một mình Ngài mà thôi.",
      "Dạy ta thờ phượng một Thiên Chúa và kính mến Người trên hết mọi sự.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Điều răn thứ hai dạy ta sự gì?",
    options: [
      "Dạy ta tôn kính Danh Thiên Chúa.",
      "Dạy ta tôn kính Danh Thiên Chúa trên hết mọi sự.",
      "Dạy ta tôn kính Danh Thiên Chúa trên hết mọi sự. Vì dưới gầm trời này, không có danh nào khác mang lại cho ta ơn cứu độ.",
      "Dạy ta tôn kính Chúa, vì tên Người là thánh và là chính Người.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Điều răn thứ ba dạy ta sự gì?",
    options: [
      "Dạy ta cử hành ngày Chúa Nhật bằng việc tham dự Thánh lễ, kiêng việc xác và làm các việc đạo đức, bái ái.",
      "Dạy ta thánh hóa ngày Chúa Nhật, tức là làm cho ngày này trở nên một ngày thánh.",
      "Dạy ta thánh hóa ngày Chúa Nhật, tức là thánh hóa mọi hành vi cử chỉ của ta, để làm cho ngày này trở nên một ngày thánh.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Đức tin là gì?",
    options: [
      "Đức tin là nhân đức siêu nhiên, giúp ta tin tưởng vào một mình Thiên Chúa.",
      "Đức tin là nhân đức siêu nhiên, giúp ta tin tưởng, trông cậy và phó thác vào một mình Thiên Chúa.",
      "Đức tin là nhân đức siêu nhiên, giúp ta vững lòng phó thác vào Chúa mà chấp nhận những điều Chúa dạy và nhờ Hội Thánh truyền lại cho ta.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Đức cậy là gì?",
    options: [
      "Là nhân đức siêu nhiên, giúp ta cậy dựa vào Chúa trong mọi hoàn cảnh vui buồn của cuộc sống.",
      "Là nhân đức siêu nhiên, giúp ta trông cậy vững vàng vào những điều Chúa truyền dạy và tín thác vào Chúa trong mọi hoàn cảnh.",
      "Đức cậy là nhân đức siêu nhiên, giúp ta trông đợi vững vàng, nhờ công nghiệp Chúa Giê-su, ta sẽ được Chúa ban ơn đầy đủ để sống xứng đáng là con cái Chúa ở đời này, và đời sau được hưởng phúc vô cùng.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Đức mến là gì?",
    options: [
      "Đức mến là nhân đức siêu nhiên, giúp ta yêu mến Chúa hết lòng hết sức trên hết mọi sự.",
      "Đức mến là nhân đức siêu nhiên làm cho ta kính mến Thiên Chúa trên hết mọi sự và thương yêu mọi người như Chúa yêu ta.",
      "Đức mến là nhân đức siêu nhiên, giúp ta yêu mến Chúa hết lòng hết sức trên hết mọi sự, cùng thực thi giáo huấn của Ngài.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ta phải thờ phượng Thiên Chúa cách nào?",
    options: [
      "Ta phải thờ phượng Thiên Chúa hết lòng và chỉ một mình Ngài mà thôi.",
      "Ta phải thờ phượng Thiên Chúa trong lòng và bề ngoài, cùng tham dự việc thờ phượng chính thức của Hội Thánh gọi là Phụng vụ.",
      "Ta phải thờ phượng Thiên Chúa hết lòng và chỉ một mình Ngài mà thôi. Ngoài Ngài ra, không có thần nào khác nữa.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Điều răn thứ bốn dạy ta những gì?",
    options: [
      "Điều răn thứ bốn dạy ta hiếu thảo với tổ tiên, ông bà, cha mẹ trong lời nói cũng như trong hành động.",
      "Điều răn thứ bốn dạy ta hiếu thảo với tổ tiên, ông bà, cha mẹ trong lời nói cũng như trong hành động, lúc các ngài còn sống cũng như khi các ngài đã qua đời.",
      "Cả A và B.",
      "Điều răn thứ bốn dạy ta hiếu thảo với cha mẹ, ông bà, tổ tiên, cũng dạy ta những bổn phận cha mẹ đối với con cái.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Sống hiếu thảo hệ tại điều gì?",
    options: [
      "Sống hiếu thảo hệ tại tấm lòng của chúng ta dành cho các bậc sinh thành.",
      "Sống hiếu thảo hệ tại yêu mến, tôn kính, vâng lời, giúp đỡ cha mẹ và các bậc bề trên.",
      "Sống hiếu thảo hệ tại không chỉ tấm lòng mà còn cả việc làm của chúng ta dành cho các bậc sinh thành.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Ta còn phải kính nể và vâng lời ai nữa không?",
    options: [
      "Ta còn phải kính nể các bậc bề trên và những người hữu trách.",
      "Ta còn phải kính nể và vâng lời các bậc bề trên và những người hữu trách. Tôn quý các vị đó trong sự tuân phục.",
      "Ta còn phải kính nể và vâng lời các vị lãnh đạo tôn giáo và xã hội.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Điều răn thứ 5, 6 và 9 dạy ta những gì?",
    options: [
      "Điều răn thứ 5, 6 và 9 dạy ta sống chung thủy, một vợ một chồng.",
      "Điều răn thứ 5, 6 và 9 dạy ta sống chung thủy, một vợ một chồng. Đồng thời, biết tôn trọng sự sống của mọi người.",
      "Điều răn thứ 5, 6 và 9 dạy ta quí trọng sự sống thể xác, tinh thần và siêu nhiên của mình và của người khác.",
      "Cả A và C",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tại sao ta phải quí trọng sự sống thể xác?",
    options: [
      "Vì sự sống thể xác mỗi người chỉ có một. Quí trọng thân xác của mình sẽ giúp chúng ta biết tôn trọng thân xác người khác.",
      "Vì thân xác là kỳ công của Thiên Chúa, là Đền thờ Chúa Thánh Thần và ngày sau sẽ sống lại.",
      "Vì sự sống thể xác mỗi người chỉ có một, do Thiên Chúa dựng nên. Quí trọng thân xác của mình sẽ giúp chúng ta biết tôn trọng thân xác người khác.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Tại sao ta phải quí trọng sự sống siêu nhiên?",
    options: [
      "Vì sự sống siêu nhiên là bởi Thiên Chúa ban cho mỗi người.",
      "Vì Chúa phán: 'Được lời lãi cả thế gian mà mất linh hồn thì được ích gì'.",
      "Vì sự sống siêu nhiên không phải do bởi sự khôn ngoan hay tài khéo của con người, nhưng là bởi Thiên Chúa ban cho mỗi người mới có được.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Điều răn thứ 7 và thứ 10 dạy ta những gì?",
    options: [
      "Điều răn thứ 7 và thứ 10 dạy ta sống công bằng, không tham lam của cải của người khác.",
      "Điều răn thứ 7 và thứ 10 dạy ta tôn trọng của cải của người khác trong hành động cũng như trong tư tưởng.",
      "Điều răn thứ 7 và thứ 10 dạy ta sống công bằng, không tham lam của cải của người khác. Không tự ý chiếm đoạt, cũng không làm thiệt hại của người ta.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Có khi nào ta lỗi điều răn thứ 7 đối với người nghèo không?",
    options: [
      "Có. Đó là khi chúng ta lấy của họ cách bất công.",
      "Có. Đó là khi chúng ta lấy hoặc chiếm giữ những đồ vật hoặc của cải của họ cách bất công.",
      "Cả B và D.",
      "Có. Đó là khi ta có thể giúp đỡ được mà bỏ qua, hoặc hoang phí, hay hà tiện.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Điều răn thứ 8 dạy ta những gì?",
    options: [
      "Điều răn thứ 8 dạy ta không được làm chứng dối để hại người.",
      "Điều răn thứ 8 dạy ta không được nói những lời gian dối cũng như không được làm chứng dối để hại người.",
      "Cả B và D.",
      "Điều răn thứ 8 dạy ta tôn trọng sự thật và danh giá của người khác.",
    ],
    answer: 3,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Khi lỗi những điều răn này, ta phải làm gì?",
    options: [
      "Ta phải tìm cách trả lại cho họ những gì ta chiếm đoạt cách bất công, đồng thời phải xin lỗi họ vì sự thiếu sót của mình.",
      "Ta phải tìm cách đền bù cho cân xứng.",
      "Ta phải tìm cách đền bù cho họ những gì ta chiếm đoạt cách bất công theo khả năng của mình, đồng thời phải xin lỗi họ vì sự thiếu sót của ta.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Chúa Giê-su có thái độ nào đối với Luật cũ?",
    options: [
      "Chúa Giê-su lên án gay gắt những sai lầm của Luật cũ.",
      "Chúa Giê-su không chỉ lên án gay gắt những sai lầm của Luật cũ, mà Ngài còn kiện toàn những lề luật đó.",
      "Chúa Giê-su luôn tôn trọng, tuân giữ và dạy người ta tuân giữ lề luật.",
      "Tất cả đều đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần I – Thiên Chúa Đấng Tạo Hóa",
    question: "Chúa Giê-su kiện toàn lề luật thế nào?",
    options: [
      "Ngài kiện toàn bằng cách chỉnh sửa lại hết những gì không còn phù hợp với thời đại.",
      "Chúa Giê-su gạn lọc những thêm thắt của người đời, và đem tình yêu vào từng lề luật để dạy loài người biết rằng: Vì yêu thương, Chúa ban lề luật.",
      "Ngài kiện toàn bằng cách chỉnh sửa lại hết những gì không còn phù hợp với thời đại. Ngài còn thêm vào đó những điều mới mẻ.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Chúa Giê-su đã làm gì để cứu chuộc loài người?",
    options: [
      "Chúa Giê-su trước khi chịu chết đã xin Chúa Cha tha cho họ, vì họ không biết việc họ làm.",
      "Chúa Giê-su đã tự hiến đời mình, chịu đau khổ, chịu chết trên thập giá và sống lại để cứu chuộc loài người.",
      "Chúa Giê-su đã tự nguyện hiến đời mình để cứu chuộc nhân loại.",
      "Cả A và C",
    ],
    answer: 1,
  },
  {
    section: "Phần II – Chúa Giêsu Đấng Cứu Thế",
    question: "Sau khi sống lại, Chúa Giê-su đã làm gì?",
    options: [
      "Sau khi sống lại, Chúa Giê-su đã xuống ngục Tổ tông, cứu lấy linh hồn những người công chính.",
      "Sau khi sống lại, trước sự chứng kiến của các môn đệ, Người đã vinh hiển về trời.",
      "Sau khi sống lại, Chúa Giê-su đã hiện ra với các Tông đồ để yên ủi các ông và sai các ông đi loan báo Tin Mừng.",
      "Sau khi sống lại, Chúa Giê-su còn hiện ra dạy dỗ, an ủi các môn đệ, sai các ông đi rao giảng Tin Mừng, rồi Người lên trời.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Giê-su hứa ban Chúa Thánh Thần cho Hội Thánh thế nào?",
    options: [
      "Chúa Giê-su đã nhiều lần hứa với các Tông đồ rằng, sau khi Ngài về trời, Ngài sẽ sai Chúa Thánh Thần đến với Hội Thánh.",
      "Chúa Giê-su hứa rằng: 'Thầy sẽ xin Chúa Cha, và Người sẽ ban cho anh em một Đấng Bào chữa khác đến ở với anh em luôn mãi'.",
      "Chúa Giê-su đã hứa với các Tông đồ, sau khi Ngài về trời, Ngài sẽ sai Chúa Thánh Thần đến. Và chính Chúa Thánh Thần sẽ là Đấng thay thế Ngài bảo vệ Hội Thánh.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Giê-su thực hiện lời hứa ra sao?",
    options: [
      "Đúng như lời Ngài đã hứa, sau khi sống lại khoảng 40 ngày, Chúa Giê-su đã cử Chúa Thánh Thần xuống.",
      "Đúng như lời Ngài đã hứa, sau khi sống lại khoảng 40 ngày, Chúa Giê-su đã cử Chúa Thánh Thần xuống, làm cho các ông trở nên những con người kiên cường, hăng hái ra đi loan báo Tin Mừng.",
      "Sau khi sống lại, Chúa Giê-su đã sai Chúa Thánh Thần đến với các Tông đồ. Chính Chúa Thánh Thần biến đổi các ông thành những người mạnh dạn rao giảng Đức Ki-tô Phục sinh.",
      "Tất cả đều đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Tại sao Chúa Thánh Thần là hồn sống của Hội Thánh?",
    options: [
      "Vì Chúa Thánh Thần là Đấng đầy quyền năng, chính Ngài thông ban sự sống mới cho Hội Thánh.",
      "Vì Chúa Thánh Thần là Đấng đầy quyền năng, chính Ngài thông ban sự sống mới cho Hội Thánh và làm cho Hội Thánh sinh thêm nhiều hoa trái.",
      "Vì Chúa Thánh Thần làm cho Hội Thánh sống động và điều hành mọi sinh hoạt trong Hội Thánh.",
      "Tất cả đều đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Thánh Thần làm gì cho Hội Thánh?",
    options: [
      "Chúa Thánh Thần hằng gìn giữ, hướng dẫn, thánh hóa và canh tân Hội Thánh ở thế gian này.",
      "Chúa Thánh Thần hằng thánh hóa và canh tân Hội Thánh. Làm cho Hội Thánh trở nên tinh tuyền, không vết nhăn, không tì ố.",
      "Chúa Thánh Thần hằng thánh hóa và canh tân Hội Thánh. Làm cho Hội Thánh trở nên tinh tuyền, xứng đáng là Bạn trăm năm của Đức Ki-tô.",
      "Cả A và C",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Thánh Thần làm gì cho người tín hữu?",
    options: [
      "Chúa Thánh Thần làm cho các tín hữu trở nên can trường, vững mạnh trong đức tin và bền tâm trong đức ái.",
      "Chúa Thánh Thần thánh hóa và làm cho người tín hữu trở nên chứng nhân của Chúa Ki-tô.",
      "Chúa Thánh Thần làm cho các tín hữu trở nên can trường, vững mạnh trong đức tin, đức cậy, đức mến và bền tâm trong đức ái.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Hội Thánh được thành lập thế nào?",
    options: [
      "Khởi đầu, Chúa Giê-su chọn 12 Tông đồ, huấn luyện họ rồi đặt Phê-rô làm đầu. Chính cộng đoàn này là hạt nhân làm phát triển Hội Thánh.",
      "Hội Thánh được thành lập từ việc Chúa Giê-su tuyển chọn 12 Tông đồ và Ngài sai các ông đi loan báo Tin Mừng.",
      "Hội Thánh được thành lập từ việc Chúa Giê-su tuyển chọn 12 Tông đồ và Ngài sai các ông đi loan báo Tin Mừng. Ngài còn hứa sẽ ở cùng họ cho đến ngày tận thế.",
      "Cả A và C",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Tại sao gọi Hội Thánh là mầu nhiệm?",
    options: [
      "Gọi Hội Thánh là mầu nhiệm vì Hội Thánh tuy là một tổ chức có cơ cấu phẩm trật như mọi tổ chức trần thế khác, nhưng lại vô cùng khó hiểu.",
      "Gọi Hội Thánh là mầu nhiệm vì Hội Thánh tuy là một tổ chức có cơ cấu phẩm trật như mọi tổ chức trần thế khác, nhưng lại vô cùng khó hiểu. Bởi Hội Thánh còn có nơi mình sức sống thần linh nội tại mà mắt thường ta không thể thấy được.",
      "Gọi Hội Thánh là mầu nhiệm vì cùng với tổ chức bên ngoài, Hội Thánh còn có sức sống bên trong, bắt nguồn từ Chúa Ba Ngôi và chuyển thông cho mọi tín hữu để phát sinh nhiều hoa trái.",
      "Cả B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Hãy kể ra ít nhiều hình ảnh lấy trong Thánh Kinh để diễn tả Hội Thánh?",
    options: [
      "Hội Thánh được ví như cửa chuồng chiên, là dân Thiên Chúa, là cánh đồng lúa và là hiền thê của Chúa Ki-tô.",
      "Công đồng Va-ti-ca-nô II đã lấy từ Thánh Kinh một số hình ảnh diễn tả về Hội Thánh, ví dụ: đàn chiên, vườn nho, cánh đồng lúa, Đền thờ, hiền thê của Chúa Ki-tô.",
      "Hội Thánh được ví như cửa chuồng chiên, là dân Thiên Chúa, là cánh đồng lúa, là Đền thờ Chúa Thánh Thần và là hiền thê của Chúa Ki-tô.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Hội Thánh Chúa Ki-tô có mấy đặc tính?",
    options: [
      "Hội Thánh có 4 đặc tính là: Duy nhất, Thánh thiện, Công giáo và Tông truyền.",
      "Hội Thánh có 4 đặc tính này là: Duy nhất, Thánh thiện, Công giáo và Thông truyền.",
      "Hội Thánh có 4 đặc tính này là: Hiệp nhất, Thánh thiện, Công giáo và Thông truyền.",
      "Tất cả đều đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao ta biết Hội Thánh là duy nhất?",
    options: [
      "Vì Hội Thánh được bắt nguồn từ Thiên Chúa Ba Ngôi là Thiên Chúa duy nhất.",
      "Vì Hội Thánh được bắt nguồn từ Thiên Chúa Ba Ngôi là Thiên Chúa duy nhất. Đồng thời, Hội Thánh còn cùng tuyên xưng một đức tin và một phép rửa duy nhất.",
      "Vì Chúa Ki-tô chỉ thiết lập một Hội Thánh, các tín hữu đều tuyên xưng một đức tin, cùng tham dự việc thờ phượng Thiên Chúa, cùng tuân phục Đức Giáo Hoàng và hiệp nhất với nhau trong tình huynh đệ.",
      "Tất cả đều đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao ta biết Hội Thánh là thánh thiện?",
    options: [
      "Vì Hội Thánh được bắt nguồn từ Thiên Chúa là Đấng Thánh.",
      "Vì Hội Thánh có Chúa Ki-tô là đầu, có Chúa Thánh Thần gìn giữ và thánh hóa, có các phương tiện nên thánh và có các hoa trái thánh thiện.",
      "Vì Hội Thánh được bắt nguồn từ Thiên Chúa là Đấng Thánh. Đồng thời, Hội Thánh còn có các phương tiện để giúp người tín hữu được nên thánh.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao ta biết Hội Thánh là Công giáo?",
    options: [
      "Vì Hội Thánh là một tổ chức chung cho tất cả mọi người.",
      "Vì Hội Thánh là một tổ chức chung cho tất cả mọi người. Ai cũng có thể gia nhập tùy ý.",
      "Vì Hội Thánh là một tổ chức chung cho tất cả mọi người ở mọi thời đại. Nơi Hội Thánh cũng không phân biệt nam nữ, sắc tộc hay niềm tin tôn giáo.",
      "Vì Hội Thánh nhận mọi người ở mọi thời đại. Ai thiện tâm đều có thể gia nhập đạo Công giáo.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Vì sao ta biết Hội Thánh là tông truyền?",
    options: [
      "Vì Hội Thánh được truyền lại từ thời các thánh Tông đồ.",
      "Vì niềm tin của Hội Thánh được truyền lại từ thời các thánh Tông đồ. Ngoài ra, Hội Thánh còn được thừa hưởng một gia sản vô giá về mọi phương diện cũng do các thánh Tông đồ để lại.",
      "Vì giáo lý đức tin và phẩm trật của Hội Thánh là do các Tông đồ truyền lại.",
      "Tất cả đều đúng.",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Ki-tô trao cho Hội Thánh những chức vụ nào?",
    options: [
      "Chúa Ki-tô trao cho Hội Thánh 3 chức vụ là: Giám mục, Linh mục và Phó tế.",
      "Chúa Ki-tô trao cho Hội Thánh 3 chức vụ là: Ngôn sứ, Tư tế và Vương giả.",
      "Chúa Ki-tô trao cho Hội Thánh 3 chức vụ là: Ngôn sứ, Tiên tri và Vương giả.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chức vụ Ngôn sứ là gì?",
    options: [
      "Là chức vụ giúp cho người lãnh nhận có khả năng ăn nói một cách trôi chảy và lưu loát.",
      "Chức vụ Ngôn sứ hay còn gọi là Chức vụ Tiên tri, giúp cho người lãnh nhận có khả năng đoán biết được tương lai.",
      "Là chức vụ rao giảng, nghĩa là Hội Thánh có nhiệm vụ rao truyền Lời Thiên Chúa cho mọi người.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chức vụ tư tế là gì?",
    options: [
      "Là chức vụ Thiên Chúa chỉ ban cho một số người được Ngài tuyển chọn.",
      "Là chức vụ thờ phượng, nghĩa là Hội Thánh có nhiệm vụ dâng lên Thiên Chúa lời ca ngợi và lễ vật lòng thành để tôn thờ Người.",
      "Là chức vụ Thiên Chúa chỉ ban cho một số người được Ngài tuyển chọn, đó là các vị Giám mục, Linh mục và Phó tế.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chức vụ Vương giả là gì?",
    options: [
      "Là chức vụ thống trị trong tinh thần phục vụ, nghĩa là Hội Thánh có nhiệm vụ làm cho mọi công việc trần thế thấm nhuần tinh thần Chúa Ki-tô.",
      "Vương giả hay còn gọi là vua. Chức vụ này được trao cho những người có trách nhiệm lãnh đạo cộng đoàn.",
      "Vương giả hay còn gọi là vua. Chức vụ này được trao cho những người có trách nhiệm lãnh đạo cộng đoàn. Để họ có thể cai trị đoàn chiên theo như ý Chúa mong muốn.",
      "Tất cả đều đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Đức Maria có cần được cứu độ không?",
    options: [
      "Thưa không. Vì Đức Mẹ là Mẹ Thiên Chúa.",
      "Thưa Đức Maria cũng cần được cứu độ như bất cứ ai. Tuy nhiên, cách thức Mẹ được cứu độ không giống với chúng ta.",
      "Đức Maria cũng cần được cứu độ như mọi người, nhưng cách thức Mẹ được cứu độ thì khác: Chúa gìn giữ Mẹ khỏi mắc tội Tổ tông. Ta gọi đó là đặc ân Vô nhiễm nguyên tội.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Đức Maria đã cộng tác vào công việc cứu độ của Chúa Giê-su như thế nào?",
    options: [
      "Đức Maria đã tích cực cộng tác với chương trình cứu độ của Thiên Chúa ngay từ giây phút khởi đầu cho đến khi Mẹ đứng dưới chân Thánh giá.",
      "Đức Maria đã hết lòng đón nhận ý định cứu độ của Thiên Chúa: cưu mang, sinh hạ Chúa Giê-su, nhất là đã chịu khổ cực để dự phần vào hy tế của Con mình.",
      "Đức Maria đã tích cực cộng tác với chương trình cứu độ của Thiên Chúa ngay từ giây phút khởi đầu. Từ khi Thiên Thần truyền tin Con Thiên Chúa nhập thể cho đến khi Mẹ đứng dưới chân Thánh giá.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Đức Maria có phải là thành phần của Hội Thánh không?",
    options: [
      "Đức Maria là thành phần của Hội Thánh vì Mẹ cũng được cứu độ nhờ công nghiệp Chúa Giê-su như các thành phần khác. Hơn nữa, Mẹ là thành phần trổi vượt vì Mẹ được chọn làm Mẹ Chúa Cứu Thế.",
      "Đức Maria là một thành phần đặc biệt so với các thành viên khác trong Hội Thánh. Vì Mẹ được chọn làm Mẹ Chúa Cứu Thế và vì các nhân đức cao vời của Mẹ.",
      "Đức Maria là một thành phần đặc biệt, là thành phần trổi vượt trên tất cả các thành phần khác trong Hội Thánh. Vì Mẹ được chọn làm Mẹ Chúa Cứu Thế và vì các nhân đức cao vời của Mẹ.",
      "Tất cả đều đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ta phải làm gì để tôn kính và yêu mến Mẹ Maria?",
    options: [
      "Ta phải năng chạy đến với Đức Mẹ, khi vui cũng như lúc buồn, ngày bình an cũng như khi gian khó. Vì Đức Mẹ là Mẹ của tất cả mỗi người chúng ta.",
      "Ta phải noi theo đức tin, đức cậy, đức mến của Mẹ: vâng theo ý Chúa, sống khiêm hạ phục vụ, suy gẫm Lời Chúa. Chúng ta cũng siêng năng lần hạt Mân Côi và sốt sắng mừng lễ Mẹ.",
      "Ta phải năng chạy đến với Đức Mẹ, khi vui cũng như lúc buồn, ngày bình an cũng như khi gian khó. Vì Đức Mẹ không những là Mẹ Thiên Chúa, mà còn là Mẹ của tất cả mỗi người chúng ta.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Năm Phụng vụ là gì?",
    options: [
      "Năm Phụng vụ là khoảng thời gian 365 ngày, trong đó, Hội Thánh dùng để kỷ niệm tất cả các ngày lễ của mình.",
      "Năm Phụng vụ là thời gian một năm bắt đầu từ Chúa Nhật thứ I Mùa Vọng, trong đó, Hội Thánh mừng các biến cố trọng đại trong cuộc đời Chúa Giê-su, Đức Mẹ và các Thánh.",
      "Năm Phụng vụ là khoảng thời gian 365 ngày, bắt đầu từ Chúa Nhật thứ I Mùa Vọng. Trong đó, Hội Thánh mừng kỷ niệm tất cả các ngày lễ của mình.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Năm Phụng vụ có mục đích nào?",
    options: [
      "Năm Phụng vụ giúp người tín hữu có cơ hội chiêm ngắm tất cả các mầu nhiệm chính yếu trong Đạo. Nhờ đó, đức tin của họ ngày càng được củng cố vững chắc hơn.",
      "Năm Phụng vụ giúp người tín hữu có cơ hội chiêm ngắm tất cả các mầu nhiệm chính yếu trong Đạo. Nhờ đó, họ thêm tin tưởng vào Chúa hơn.",
      "Năm Phụng vụ có mục đích giúp người tín hữu hiểu và sống các mầu nhiệm trong đạo cách thiết thực hơn.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ơn Chúa là gì?",
    options: [
      "Ơn Chúa là sức mạnh Chúa ban, để ta sống hạnh phúc ở đời này và đời sau.",
      "Ơn Chúa là sự sống và sức mạnh Chúa ban để ta sống hạnh phúc đời này và đời sau.",
      "Ơn Chúa là những ơn lành Thiên Chúa ban, để giúp ta làm điều lành và tránh điều dữ.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích là gì?",
    options: [
      "Bí tích là những điều bí nhiệm do Chúa Giê-su thiết lập.",
      "Bí tích là dấu chỉ bên ngoài Chúa dùng để diễn tả và thông ban ơn bên trong cho loài người.",
      "Bí tích là những điều bí nhiệm mà Chúa Giê-su đã thiết lập, để thông ban những ơn cần thiết cho con người.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Có mấy Bí tích?",
    options: [
      "Có 7 Bí tích là: Bí tích Rửa tội, Thêm sức, Giải tội, Thánh Thể, An táng, Hôn phối và Truyền Chức thánh.",
      "Có 7 Bí tích là: Bí tích Rửa tội, Thêm sức, Giải tội, Chầu Thánh Thể, Xức dầu bệnh nhân, Hôn phối và Truyền Chức thánh.",
      "Có 7 Bí tích là: Bí tích Rửa tội, Thêm sức, Giải tội, Thánh Thể, Xức dầu bệnh nhân, Hôn phối và Truyền Chức thánh.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Rửa tội có cần thiết không?",
    options: [
      "Bí tích Rửa tội rất cần thiết như lời Chúa phán: 'Không ai có thể vào Nước Thiên Chúa nếu không sinh ra bởi nước và Thần Khí'.",
      "Bí tích Rửa tội rất cần thiết. Vì đây được coi như cửa ngõ để dẫn đưa ta vào Hội Thánh của Chúa Giê-su.",
      "Bí tích Rửa tội rất cần thiết. Vì đây được coi như cửa ngõ và là khởi đầu để dẫn đưa ta vào Hội Thánh của Chúa Giê-su, như lời Chúa phán: 'Không ai có thể vào Nước Thiên Chúa nếu không sinh ra bởi nước và Thần Khí'.",
      "Tất cả đều đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Rửa tội ban cho ta những ơn nào?",
    options: [
      "Bí tích Rửa tội ban cho chúng ta được sạch tất cả các tội lỗi, tội chung cũng như tội riêng.",
      "Bí tích Rửa tội ban cho chúng ta được sạch tất cả các tội lỗi, tội chung cũng như tội riêng. Làm cho ta trở nên con Chúa và con Hội Thánh.",
      "Bí tích Rửa tội tha tội Tổ tông và tội riêng, làm cho ta trở nên con Chúa và con Hội Thánh.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Người lãnh Bí tích Rửa tội thề hứa những gì?",
    options: [
      "Họ thề không bao giờ bỏ Chúa và Hội Thánh của Người.",
      "Họ thề hứa từ bỏ ma quỷ và tin theo Chúa Ki-tô.",
      "Họ thề cho dù đến chết cũng không bao giờ bỏ Chúa và bỏ Đạo.",
      "Cả A và B",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Thêm sức là gì?",
    options: [
      "Là Bí tích ban cho ta ơn sức mạnh. Giúp ta trở thành con người trưởng thành trước mặt Thiên Chúa và mọi người.",
      "Là Bí tích ban cho ta ơn sức mạnh. Giúp ta trở thành con người trưởng thành trước mặt Thiên Chúa và mọi người nhờ Chúa Thánh Thần.",
      "Là Bí tích Chúa Giê-su đã lập cho ta lãnh nhận dồi dào ơn Chúa Thánh Thần.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Thêm sức ban cho ta những ơn nào?",
    options: [
      "Bí tích Thêm sức ban cho ta những ơn này là: Ơn Khôn ngoan, Hiểu biết và Thông minh.",
      "Bí tích Thêm sức ban cho ta những ơn này là: Ơn Lo liệu, Sức mạnh, Đạo đức và Ơn kính sợ Chúa.",
      "Cả A và B.",
      "Bí tích Thêm sức tăng cường đời sống siêu nhiên, gắn bó ta cách mật thiết hơn với Hội Thánh và thúc giục ta làm việc tông đồ truyền giáo.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Thánh Thể là gì?",
    options: [
      "Là Bí tích Chúa Giê-su đã lập để biến bánh rượu nên Mình Máu Người làm lương thực nuôi sống ta phần hồn.",
      "Là Bí tích Chúa Giê-su đã lập để ban dồi dào ơn Chúa Thánh Thần cho người lãnh nhận.",
      "Là Bí tích Chúa Giê-su đã lập để ban dồi dào ơn Chúa Thánh Thần cho người lãnh nhận. Cùng ban Mình Máu Người làm lương thực nuôi sống ta phần hồn.",
      "Tất cả đều đúng.",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Giê-su ngự trong Bí tích Thánh Thể thế nào?",
    options: [
      "Chúa Giê-su ngự thật trong Bí tích Thánh Thể. Tuy nhiên, Ngài chỉ hiện diện khi cử hành Thánh lễ mà thôi.",
      "Chúa Giê-su ngự thật trong Bí tích Thánh Thể. Tuy nhiên, Ngài còn hiện diện trong Lời của Ngài trong Thánh lễ nữa.",
      "Chúa Giê-su ngự thật trong Bí tích Thánh Thể, nghĩa là trong mỗi hình Bánh, hình Rượu dù nhỏ bé cũng có toàn vẹn Chúa Giê-su.",
      "Cả A và B",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ta phải kính thờ Chúa Giê-su trong Thánh Thể thế nào?",
    options: [
      "Ta phải năng đến kính viếng và thờ lạy Ngài bất cứ khi nào có điều kiện và bất cứ nơi đâu có sự hiện diện của Ngài.",
      "Ta phải năng đến kính viếng, tôn thờ, giữ sự nghiêm trang đứng đắn trong nhà thờ, nhất là siêng năng tham dự Thánh Lễ và hiệp lễ sốt sắng.",
      "Ta phải năng đến kính viếng và thờ lạy Ngài. Hơn nữa, chúng ta phải học nơi Chúa Giê-su Thánh Thể sự hy sinh và hiến thân mình vì hạnh phúc của người khác.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Thánh lễ là gì?",
    options: [
      "Là Bí tích Chúa Giê-su đã lập để ban Mình Máu Người dưới hình bánh rượu làm của ăn nuôi dưỡng linh hồn ta.",
      "Thánh lễ là Hy tế Chúa Giê-su nhờ tay linh mục hợp cùng toàn thể dân Chúa mà dâng mình cho Chúa Cha, như xưa chính Người đã dâng mình trên Thánh giá.",
      "Là Hy tế Chúa Giê-su đã lập xưa kia trên đồi Can-vê, nay được tái hiện lại trên bàn thờ mỗi ngày nhờ tay linh mục.",
      "Cả A và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Thánh lễ có mấy phần?",
    options: [
      "Thánh lễ gồm hai phần chính là: Phụng vụ và Thánh Thể.",
      "Thánh lễ gồm hai phần chính là: Phụng vụ Lời Chúa và Thánh Lễ.",
      "Thánh lễ gồm hai phần chính là: Phụng vụ và Chầu Thánh Thể.",
      "Thánh lễ có hai phần chính là: Phụng vụ Lời Chúa và Phụng vụ Thánh Thể.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Phải tham dự Thánh lễ thế nào?",
    options: [
      "Phải tham dự Thánh lễ cách tích cực, nghiêm trang và sốt sắng. Nếu được, nên đến sớm, tìm chỗ ngồi thích hợp, để có thể tham dự Thánh lễ trọn vẹn từ đầu đến cuối.",
      "Phải hợp lòng hợp ý với chủ tế và cộng đoàn để dâng lễ, tham dự cách ý thức, thành kính và linh động, nhất là dọn lòng hiệp lễ.",
      "Phải tham dự Thánh lễ cách tích cực, nghiêm trang và sốt sắng. Không nên nói chuyện riêng, không nghe điện thoại hay làm những điều tương tự.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Giải tội là gì?",
    options: [
      "Bí tích Giải tội là Bí tích chính Chúa Cha đã lập để tha tội ta phạm từ khi lãnh nhận Bí tích Rửa tội về sau.",
      "Bí tích Giải tội là Bí tích chính Chúa Cha đã lập để tha tội ta phạm và giao hòa ta với Chúa cùng Hội Thánh.",
      "Là Bí tích Chúa Giê-su đã lập để tha tội ta phạm từ khi lãnh nhận Bí tích Rửa tội về sau, cùng giao hòa ta với Chúa và Hội Thánh.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Chúa Giê-su đã lập Bí tích Giải tội khi nào?",
    options: [
      "Sau bữa Tiệc ly, Chúa Giê-su đã long trọng hà hơi trên các Tông đồ và phán: 'Anh em hãy nhận lấy Thánh Thần. Anh em tha tội cho ai, thì người ấy được tha'.",
      "Sau khi sống lại, Chúa Giê-su hiện ra, thổi hơi trên các Tông đồ và phán: 'Anh em hãy nhận lấy Thánh Thần. Anh em tha tội cho ai, thì người ấy được tha'.",
      "Sau khi đã về trời, Chúa Giê-su đã hiện ra với các Tông đồ và phán: 'Anh em hãy nhận lấy Thánh Thần. Anh em tha tội cho ai, thì người ấy được tha'.",
      "Tất cả đều đúng.",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ai có quyền tha tội?",
    options: [
      "Chỉ có Giám mục và Linh mục mới có quyền tha tội mà thôi.",
      "Không một người giáo dân Công Giáo nào được thi hành quyền bính này, mà chỉ có các Đức Giám mục và Linh mục mới có quyền tha tội mà thôi.",
      "Chỉ có Thiên Chúa mới có quyền tha tội, nhưng Người đã trao quyền ấy cho các tông đồ và các Đấng kế vị. Vì thế, các Giám mục và linh mục nào được phép, mới có quyền ban Bí tích Giải tội.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ai cần lãnh nhận Bí tích Giải tội?",
    options: [
      "Chỉ những người tín hữu mắc tội trọng thì mới cần lãnh nhận Bí tích Giải tội.",
      "Những tín hữu đã phạm tội trọng thì cần phải lãnh nhận Bí tích Giải tội, nhưng ai chỉ mắc tội nhẹ mà lãnh nhận Bí tích này, thì được nhiều ích lợi thiêng liêng.",
      "Chỉ những người tín hữu mắc tội trọng và trong cơn hấp hối thì mới cần lãnh nhận Bí tích Giải tội. Ngoài những trường hợp kể trên, họ chỉ cần thực lòng thống hối ăn năn là được.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Muốn lãnh nhận Bí tích Giải tội thì phải làm gì?",
    options: [
      "Trước tiên phải liên hệ với linh mục có quyền giải tội. Thứ đến, cần xét mình, hoặc nhờ người khác trợ giúp. Sau cùng là ăn năn và đền tội.",
      "Phải hết lòng ăn năn và quyết tâm chừa cải.",
      "Phải làm 4 việc này: Xét mình, Thống hối lỗi lầm, Ăn năn và Đền tội.",
      "Phải làm 4 việc này: Xét mình, Ăn năn dốc lòng chừa, Xưng tội và Đền tội.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Xức Dầu bệnh nhân là gì?",
    options: [
      "Là Bí tích Chúa Giê-su đã lập để ban ơn nâng đỡ cho những người hấp hối.",
      "Là Bí tích Chúa Giê-su đã lập để ban ơn nâng đỡ bệnh nhân phần hồn phần xác và chuẩn bị bước về đời sau.",
      "Là Bí tích Chúa Giê-su đã lập để ban ơn nâng đỡ cho những người hấp hối. Giúp họ gia tăng sức mạnh để can đảm bước về đời sau.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Nên lãnh nhận Bí tích Xức Dầu bệnh nhân khi nào?",
    options: [
      "Các bệnh nhân có nguy cơ chết thì cần lãnh Bí tích Xức dầu bệnh nhân và nên lãnh nhận khi còn tỉnh táo để được hưởng nhiều hiệu quả hơn.",
      "Bất cứ lúc nào cũng có thể lãnh nhận Bí tích này, miễn là tâm hồn người bệnh đã được chuẩn bị sẵn sàng.",
      "Chỉ khi nào người bệnh thực sự hấp hối, mới có thể lãnh nhận Bí tích này.",
      "Cả A, B và C",
    ],
    answer: 0,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Bí tích Truyền Chức thánh là gì?",
    options: [
      "Là Bí tích Chúa Giê-su đã lập để ban chức thánh cho những người Chúa chọn.",
      "Là Bí tích Chúa Giê-su đã lập để ban chức thánh cho những người được coi là xứng đáng, mà chính Thiên Chúa đã chọn.",
      "Là Bí tích Chúa Giê-su đã lập để thánh hiến những vị mà Chúa muốn trao cho tác vụ thánh trong dân Chúa.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Ai được lãnh Bí tích Truyền Chức thánh?",
    options: [
      "Tất cả những ai đã hội đủ điều kiện như Giáo Hội quy định.",
      "Chỉ những người nam đã được rửa tội, có ý muốn ngay lành là trở nên người suốt đời phục vụ Chúa và Hội Thánh, mới được lãnh nhận chức thánh mà thôi.",
      "Chỉ những người Thiên Chúa gọi, mới được lãnh nhận chức thánh mà thôi.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Xét theo đức tin Công giáo, chết là gì?",
    options: [
      "Chết là đi vào cõi vĩnh hằng. Đến một nơi không còn phải đau khổ và không phải chết một lần nữa.",
      "Chết là hậu quả của tội lỗi, là ngưỡng cửa bước vào đời sau. Chết còn là điều kiện để người tín hữu tham dự vào cuộc Phục sinh của Chúa Ki-tô.",
      "Chết là kết thúc cuộc sống tạm bợ này để đi về thế giới bên kia. Đến một nơi không còn phải đau khổ và không phải chết một lần nữa.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Phán xét là gì?",
    options: [
      "Phán xét là việc Thiên Chúa phán xử kẻ sống cũng như kẻ chết.",
      "Phán xét là việc Thiên Chúa phán xử kẻ sống cũng như kẻ chết. Là lúc mà Thiên Chúa sẽ phơi bày ra ánh sáng tất cả những việc tốt cũng như xấu mà con người đã làm khi còn sống.",
      "Là việc Thiên Chúa luận định tội phúc loài người đã làm khi còn sống ở trần gian, rồi ấn định số phận đời đời cho họ.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Thiên đàng là gì?",
    options: [
      "Thiên đàng là nơi cực lạc, nơi đó, con người sẽ được hưởng hạnh phúc dài lâu.",
      "Thiên đàng là nơi Thiên Chúa ban thưởng cho những ai sống một cuộc đời tốt lành, thánh thiện.",
      "Thiên đàng là nơi Thiên Chúa ban thưởng cho những ai sống một cuộc đời tốt lành, thánh thiện. Nơi đó, con người sẽ được hưởng hạnh phúc dài lâu.",
      "Thiên đàng là trạng thái được hạnh phúc ở với Chúa mãi mãi.",
    ],
    answer: 3,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Hỏa ngục là gì?",
    options: [
      "Hỏa ngục là nơi vô cùng khủng khiếp và hãi hùng. Dành cho những ai sống một cuộc đời bất thiện.",
      "Hỏa ngục là trạng thái dứt khoát của án phạt mà hình phạt đau đớn nhất là phải xa Chúa đời đời.",
      "Hỏa ngục là nơi vô cùng khủng khiếp và hãi hùng. Nơi đó, con người sẽ phải trả giá về tất cả những sai lỗi mà họ đã phạm ở trần gian.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question:
      "Đứng trước cảnh nay còn mai mất của kiếp người, chúng ta cần có thái độ nào?",
    options: [
      "Chúng ta nên ý thức rằng, kiếp người phù du vắn vỏi, chỉ tựa như hoa cỏ ngoài đồng. Nhờ đó, mỗi người hãy chỉnh đốn đời sống của mình, cố gắng làm lành lánh dữ.",
      "Chúng ta hãy thành tâm ăn năn thống hối, chỉnh đốn đời sống của mình, cố gắng làm lành lánh dữ, để được hưởng thiên đàng mai sau.",
      "Chúng ta cần cậy dựa vào Chúa là đá tảng vững chắc chứ đừng bám víu những cái mau qua để hưởng thụ hoặc thất vọng, chán chường.",
      "Cả A, B và C",
    ],
    answer: 2,
  },
  {
    section: "Phần III – Chúa Thánh Thần",
    question: "Nghĩa vụ hiện tại của người tín hữu là gì?",
    options: [
      "Nghĩa vụ hiện tại của người tín hữu là siêng năng tham dự Thánh lễ, lãnh nhận các Bí tích, đồng thời làm việc lành phúc đức để lập công phúc mai sau.",
      "Trong khi chờ đợi Trời mới Đất mới, người tín hữu phải tích cực xây dựng thế giới này mỗi ngày một tốt đẹp hơn về mọi mặt: vật chất, tinh thần và tôn giáo.",
      "Nghĩa vụ hiện tại của người tín hữu là siêng năng lãnh nhận các Bí tích, nhất là Bí tích Thánh Thể. Đồng thời, ăn năn thống hối tội lỗi mình đã phạm và tích cực làm việc lành phúc đức để lập công phúc mai sau.",
      "Cả A, B và C",
    ],
    answer: 1,
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const QUIZ_SIZE = 20;

const SECTION_ORDER = [
  "all",
  "Phần Mở Đầu",
  "Phần I – Thiên Chúa Đấng Tạo Hóa",
  "Phần II – Chúa Giêsu Đấng Cứu Thế",
  "Phần III – Chúa Thánh Thần",
];

type Phase = "menu" | "quiz" | "result";

export default function GiaoLyQuiz() {
  const [phase, setPhase] = useState<Phase>("menu");
  const [selectedSection, setSelectedSection] = useState("all");
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);


  const sectionCounts = SECTION_ORDER.reduce<Record<string, number>>((acc, s) => {
    acc[s] =
      s === "all"
        ? ALL_QUESTIONS.length
        : ALL_QUESTIONS.filter((q) => q.section === s).length;
    return acc;
  }, {});

  useEffect(() => {
    if (!timerActive || confirmed || phase !== "quiz") return;
    if (timeLeft <= 0) {
      handleConfirm(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, timerActive, confirmed, phase]);

  function startQuiz() {
    const pool =
      selectedSection === "all"
        ? ALL_QUESTIONS
        : ALL_QUESTIONS.filter((q) => q.section === selectedSection);
    const picked = shuffle(pool).slice(0, Math.min(QUIZ_SIZE, pool.length));
    setQuizQuestions(picked);
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setAnswers([]);
    setTimeLeft(30);
    setTimerActive(true);
    setPhase("quiz");
  }

  const q = quizQuestions[current];

  function handleSelect(idx: number) {
    if (confirmed) return;
    setSelected(idx);
  }

  function handleConfirm(timeout = false) {
    if (confirmed) return;
    setConfirmed(true);
    setTimerActive(false);
    const sel = timeout ? -1 : (selected as number);
    const isCorrect = sel === q.answer;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((a) => [
      ...a,
      {
        question: q.question,
        selected: sel,
        correct: q.answer,
        section: q.section,
        options: q.options,
      },
    ]);
  }

  function handleNext() {
    if (current + 1 >= quizQuestions.length) {
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
      setTimeLeft(30);
      setTimerActive(true);
    }
  }

  const pct = quizQuestions.length
    ? Math.round((score / quizQuestions.length) * 100)
    : 0;
  const timerColor =
    timeLeft > 10 ? "text-amber-600" : timeLeft > 5 ? "text-orange-500" : "text-red-600";
  const progress = quizQuestions.length
    ? (current / quizQuestions.length) * 100
    : 0;

  // ── MENU ──────────────────────────────────────────────────────────────────
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 flex items-start justify-center p-4 sm:p-6 font-serif">
        <div className="w-full max-w-2xl bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-2xl border-2 border-amber-500 p-6 sm:p-8 mt-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 border-b-2 border-amber-500 pb-5 mb-5">
            <span className="text-amber-700 text-2xl">✝</span>
            <h1 className="text-xl sm:text-2xl font-bold text-amber-900 tracking-widest uppercase text-center">
              Giáo Lý Dự Tòng
            </h1>
            <span className="text-amber-700 text-2xl">✝</span>
          </div>

          <p className="text-center text-sm text-amber-700 italic mb-6">
            Bộ câu hỏi trắc nghiệm – Giáo phận Bắc Ninh
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { num: ALL_QUESTIONS.length, label: "Tổng câu hỏi" },
              { num: QUIZ_SIZE, label: "Câu mỗi lần thi" },
              { num: "30s", label: "Mỗi câu" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-3 text-center border border-amber-200 shadow-sm"
              >
                <div className="text-2xl font-bold text-amber-700">{num}</div>
                <div className="text-xs text-amber-600 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Section picker */}
          <p className="text-sm font-semibold text-amber-800 mb-3">Chọn phần thi:</p>
          <div className="flex flex-col gap-2 mb-4">
            {SECTION_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSection(s)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all border-2 ${
                  selectedSection === s
                    ? "bg-amber-500 border-amber-600 text-white shadow-md"
                    : "bg-white border-amber-200 text-amber-800 hover:border-amber-400"
                }`}
              >
                <span>{s === "all" ? "🌐 Tất cả phần" : s}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedSection === s
                      ? "bg-amber-600 text-white"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {sectionCounts[s]} câu
                </span>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-amber-700 mb-6">
            Sẽ rút ngẫu nhiên{" "}
            <strong>{Math.min(QUIZ_SIZE, sectionCounts[selectedSection])}</strong> câu từ{" "}
            <strong>{sectionCounts[selectedSection]}</strong> câu
          </p>

          <button
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-amber-950 font-bold text-lg py-3 rounded-2xl shadow-lg tracking-wide transition-all active:scale-95"
          >
            ✝ Bắt đầu thi ✝
          </button>

          <p className="text-center text-xs text-amber-500 italic mt-5">
            Giáo phận Bắc Ninh · Giáo lý Dự Tòng – Gp. Xuân Lộc 2005
          </p>
        </div>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (phase === "result") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 flex items-start justify-center p-4 sm:p-6 font-serif">
        <div className="w-full max-w-2xl bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-2xl border-2 border-amber-500 p-6 sm:p-8 mt-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 border-b-2 border-amber-500 pb-5 mb-5">
            <span className="text-amber-700 text-2xl">✝</span>
            <h1 className="text-xl sm:text-2xl font-bold text-amber-900 tracking-widest uppercase">
              Kết Quả Bài Thi
            </h1>
            <span className="text-amber-700 text-2xl">✝</span>
          </div>

          {/* Score circle */}
          <div className="flex justify-center mb-3">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex flex-col items-center justify-center shadow-lg">
              <span className="text-4xl font-black text-white leading-none">{score}</span>
              <span className="text-sm text-amber-100">/{quizQuestions.length}</span>
            </div>
          </div>

          <p className="text-center text-base text-amber-700 mb-1">{pct}% câu đúng</p>
          <p className="text-center text-sm italic text-amber-800 mb-5">
            {pct >= 90
              ? "🌟 Xuất sắc! Bạn đã nắm vững Giáo lý Dự Tòng."
              : pct >= 70
              ? "✅ Khá tốt! Ôn lại những câu còn sai nhé."
              : pct >= 50
              ? "📖 Trung bình. Hãy học lại tài liệu."
              : "🙏 Cần cố gắng thêm. Đọc lại giáo lý rồi thi tiếp nhé!"}
          </p>

          {/* Review */}
          <h3 className="font-bold text-amber-800 text-sm mb-3">Chi tiết trả lời</h3>
          <div className="max-h-80 overflow-y-auto space-y-2 mb-5 pr-1">
            {answers.map((a, i) => {
              const correct = a.selected === a.correct;
              return (
                <div
                  key={i}
                  className={`rounded-lg p-3 bg-white border-l-4 ${
                    correct ? "border-green-500" : "border-red-500"
                  }`}
                >
                  <p className="text-[10px] italic text-amber-600 mb-0.5">{a.section}</p>
                  <p className="text-xs text-stone-800 mb-1">
                    <strong>Câu {i + 1}:</strong> {a.question}
                  </p>
                  <p
                    className={`text-xs font-semibold ${
                      correct ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {a.selected === -1
                      ? "⏰ Hết giờ – chưa trả lời"
                      : correct
                      ? `✓ Đúng: ${["A", "B", "C", "D"][a.correct]}. ${a.options[a.correct]}`
                      : `✗ Sai – Đáp án đúng: ${["A", "B", "C", "D"][a.correct]}. ${a.options[a.correct]}`}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-amber-950 font-bold py-2.5 px-6 rounded-2xl shadow transition-all active:scale-95"
            >
              Thi lại (câu mới)
            </button>
            <button
              onClick={() => setPhase("menu")}
              className="bg-amber-50 border-2 border-amber-400 hover:bg-amber-100 text-amber-800 font-bold py-2.5 px-6 rounded-2xl transition-all active:scale-95"
            >
              Về trang chủ
            </button>
          </div>

          <p className="text-center text-xs text-amber-500 italic mt-5">
            Giáo phận Bắc Ninh · Giáo lý Dự Tòng
          </p>
        </div>
      </div>
    );
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  const LETTERS = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 flex items-start justify-center p-4 sm:p-6 font-serif">
      <div className="w-full max-w-2xl bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-2xl border-2 border-amber-500 p-5 sm:p-7 mt-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 border-b-2 border-amber-500 pb-4 mb-4">
          <span className="text-amber-700 text-xl">✝</span>
          <h2 className="text-lg sm:text-xl font-bold text-amber-900 tracking-widest uppercase">
            Giáo Lý Dự Tòng
          </h2>
          <span className="text-amber-700 text-xl">✝</span>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1.5 text-xs">
            <span className="text-amber-700 font-medium">
              Câu {current + 1} / {quizQuestions.length}
            </span>
            <span className={`font-bold ${timerColor}`}>⏱ {timeLeft}s</span>
          </div>
        </div>

        {/* Score badge */}
        <div className="flex justify-end mb-2">
          <span className="bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full">
            Điểm: {score}
          </span>
        </div>

        {/* Section tag */}
        <p className="text-xs italic text-amber-600 mb-1">{q.section}</p>

        {/* Question */}
        <h3 className="text-sm sm:text-base font-semibold text-stone-800 mb-4 leading-relaxed">
          {q.question}
        </h3>

        {/* Options */}
        <div className="flex flex-col gap-2 mb-5">
          {q.options.map((opt, idx) => {
            const letter =
              q.options.length <= 2 ? (idx === 0 ? "✓" : "✗") : LETTERS[idx];
            let btnClass =
              "flex items-start gap-3 w-full rounded-xl px-4 py-3 text-left text-sm border-2 transition-all ";
            if (confirmed) {
              if (idx === q.answer)
                btnClass += "bg-green-50 border-green-500 text-green-800";
              else if (idx === selected)
                btnClass += "bg-red-50 border-red-400 text-red-700";
              else btnClass += "bg-white border-amber-100 text-stone-400 opacity-60";
            } else if (selected === idx) {
              btnClass += "bg-amber-100 border-amber-500 text-amber-900";
            } else {
              btnClass +=
                "bg-white border-amber-200 text-stone-700 hover:border-amber-400 hover:bg-amber-50";
            }
            return (
              <button key={idx} className={btnClass} onClick={() => handleSelect(idx)}>
                <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-xs font-bold mt-0.5">
                  {letter}
                </span>
                <span className="flex-1 leading-relaxed">{opt}</span>
                {confirmed && idx === q.answer && (
                  <span className="text-green-600 font-black text-lg">✓</span>
                )}
                {confirmed && idx === selected && idx !== q.answer && (
                  <span className="text-red-500 font-black text-lg">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action */}
        <div className="flex justify-center">
          {!confirmed ? (
            <button
              disabled={selected === null}
              onClick={() => handleConfirm(false)}
              className="bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 font-bold py-2.5 px-8 rounded-2xl shadow transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Xác nhận
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-amber-950 font-bold py-2.5 px-8 rounded-2xl shadow transition-all active:scale-95"
            >
              {current + 1 >= quizQuestions.length ? "Xem kết quả →" : "Câu tiếp theo →"}
            </button>
          )}
        </div>

        <p className="text-center text-xs text-amber-500 italic mt-5">
          Giáo phận Bắc Ninh · Giáo lý Dự Tòng
        </p>
      </div>
    </div>
  );
}
