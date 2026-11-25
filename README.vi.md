# clawd-buddy-gauges

[English](README.md)

Mod cho Claude Code: một dải nằm trên ô nhập, có bạn Clawd hoạt hình, các thanh đo context và hạn mức, cùng nút
Compact.

<p>
  <img src="docs/demo/band-wide.png" width="733" alt="Dải trên cửa sổ rộng, đang chạy một lượt"><br>
  <sub>Dải trên cửa sổ rộng, đang chạy một lượt</sub>
</p>
<p>
  <img src="docs/demo/band-compact.png" width="484" alt="Trên cửa sổ hẹp, lúc rảnh: hiện nút và đếm ngược cache"><br>
  <sub>Trên cửa sổ hẹp, lúc rảnh: hiện nút và đếm ngược cache</sub>
</p>

<p>
  <img src="docs/pets/thinking.wizard.svg" width="150" alt="Clawd làm phép lúc đang nghĩ">
  <img src="docs/pets/running.jog.svg" width="150" alt="Clawd chạy bộ lúc chạy lệnh">
  <img src="docs/pets/done.roid.svg" width="150" alt="Clawd khoe cơ lúc xong lượt">
  <img src="docs/pets/idle.crab.svg" width="150" alt="Clawd bò ngang lúc rảnh">
</p>

**[▶ Xem hết các con Clawd, theo từng tình huống](docs/PETS.vi.md)**

## Trên dải có gì

- **Bên trái, bạn Clawd.** Clawd diễn lại việc Claude đang làm: nghĩ, đọc, sửa file, chạy lệnh, chờ bạn, xong lượt,
  test fail, đang compact. Có 17 trạng thái, mỗi trạng thái 3 tới 6 kiểu. [Xem hết các kiểu](docs/PETS.vi.md).
  Trên app desktop, bấm vào Clawd để đổi lần lượt các kiểu của trạng thái đang hiện.
- **Ở giữa, các thanh đo.** `CTX` (context đã dùng, có vạch chỗ tự compact), `5H` và `7D` (hạn mức 5 giờ và theo
  tuần, kèm dự báo tốc độ dùng của hạn 5 giờ tới lúc reset), và đồng hồ lượt. Bên dưới là dòng chữ Claude đang làm gì.
- **Bên phải, nút Compact.** Chạy y như `/compact`. Trên app desktop nút này còn đếm ngược cache prompt, hết cache
  thì chuyển đỏ.
- **⎇** mở danh sách repo git trong thư mục session và các nhánh của chúng, đổi nhánh ngay trên dải.

Hiện trên app desktop Claude Code và extension VS Code. Terminal giữ nguyên, không đổi.

## Dải theo từng trạng thái

Vẽ bằng chính code thanh đo của mod với số liệu mẫu, Clawd lấy từ bộ hình thật.

**Đang nghĩ**<br>
<img src="docs/demo/band-thinking.png" width="760" alt="Đang nghĩ">

**Đang sửa file**<br>
<img src="docs/demo/band-coding.png" width="760" alt="Đang sửa file">

**Xong lượt**<br>
<img src="docs/demo/band-done.png" width="760" alt="Xong lượt">

**Nghỉ giữa các lượt, cache đang đếm ngược**<br>
<img src="docs/demo/band-idle.png" width="760" alt="Nghỉ giữa các lượt, cache đang đếm ngược">

**Hết cache: nên bấm Compact**<br>
<img src="docs/demo/band-cache-expired.png" width="760" alt="Hết cache: nên bấm Compact">

## Cài đặt

**Cách dễ nhất:** mở Claude Code (app desktop hoặc VS Code), dán đoạn này vào rồi gửi:

```text
Cài giúp tôi plugin Claude Code tên clawd-buddy-gauges. Chạy hai lệnh này trong terminal:
claude plugin marketplace add Vietanh2996/clawd-buddy-gauges
claude plugin install clawd-buddy-gauges@clawd-buddy-gauges
Sau đó chạy "claude plugin list" để kiểm tra đã cài và đang bật chưa, rồi báo tôi bằng lời dễ hiểu là được hay chưa. Nếu được thì nhắc tôi mở session mới để thấy dải.
```

**Hoặc tự gõ** trong terminal:

```bash
claude plugin marketplace add Vietanh2996/clawd-buddy-gauges
```

```bash
claude plugin install clawd-buddy-gauges@clawd-buddy-gauges
```

Mở session mới là thấy dải. Lấy bản mới về sau này:

```bash
claude plugin marketplace update clawd-buddy-gauges
```

## Dùng

- `/clawd` bật hoặc tắt dải; `/clawd on`, `/clawd off` để chỉ rõ.

## Sửa mod

Clone repo, sửa, rồi chạy `./reinstall.sh` để cài bản đang sửa thành bản Claude Code chạy (mỗi lần tự nâng số bản;
`--minor` cho đợt sửa lớn). Test nằm trong `plugins/clawd-buddy-gauges/tests`.

## Nguồn và giấy phép

Dựa trên ba dự án mở, xin cảm ơn:

- [clawd-crew](https://github.com/hudcolighting/clawd-crew) của hudcolighting (GPL-3.0-or-later): hình pixel Clawd
  và các animation. Vẽ thêm 18 animation cùng phong cách.
- [clawd-pet](https://github.com/Revono/clawd-pet) của Revono (MIT): khung ban đầu của dải, và icon.
- [clawd-companion](https://github.com/DevVaradPatil/clawd-companion) của Varad Patil (MIT): các thanh đo, từ mod
  clawd-bar.

Phát hành theo GNU General Public License v3.0 hoặc mới hơn, xem [LICENSE](LICENSE). Phần nào lấy từ đâu và nguyên
văn thông báo MIT gốc: [NOTICE.md](NOTICE.md).

Dự án fan làm, không chính thức. Claude, Claude Code và Clawd thuộc về Anthropic; mod này không do Anthropic làm,
bảo trợ hay hỗ trợ.
