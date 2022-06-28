import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Header from "../components/Layouts/Header";
import Layout from "../components/Layouts/Layout";
import useTimeout from '../hooks/useTimeOut';

const Dieukhoan = () => {

  const [loading, setLoading] = useState(true);
  useTimeout(() => setLoading(false), loading ? 1000 : null);

  return (
    <>
      <Header title="Điều Khoản Sử Dụng" />
      <Layout>
        <div className="pt-20 lg:py-32">
          <div className="max-w-5xl bg-white p-6 m-auto border rounded-none md:rounded-xl">
            <h1 className="text-xl md:text-3xl font-bold uppercase">
              Điều Khoản Sử Dụng
            </h1>
            <h2 className="text-lg font-bold mt-2 mb-3">1. Giới thiệu</h2>
            <div className="ml-5">
              {
                loading ? <Skeleton>
                  <p></p>
                </Skeleton> : <p>
                  Chào mừng bạn đến với Trang (website) khuyến mãi Doppelherz (sau
                  đây gọi là &ldquo;Doppelherz Việt Nam&ldquo;).
                </p>
              }
              <br />
              {
                loading ? <Skeleton count={3}>
                  <p></p>
                </Skeleton> : <p>
                  Doppelherz Việt Nam là Trang thương mại điện tử của Công ty Cổ
                  phần Mastertran, một doanh nghiệp được thành lập hợp pháp tại
                  Việt Nam với Giấy chứng nhận đăng ký doanh nghiệp số 0105381169
                  do Sở Kế hoạch và Đầu tư Hà Nội cấp ngày 27/06/2011. Doanh
                  nghiệp chúng tôi phân phối độc quyền các sản phẩm thực phẩm chức
                  năng có xuất xứ thương hiệu Doppelherz, CHLB Đức.
                </p>
              }
              <br />
              {
                loading ? <Skeleton count={3}>
                  <p></p>
                </Skeleton> : <p>
                  Khi bạn truy cập vào Doppelherz Việt Nam có nghĩa là bạn đồng ý
                  với các điều khoản sử dụng này và tất cả các sửa đổi bổ sung
                  theo từng thời điểm mà không cần thông báo trước của chúng tôi.
                  Bạn vui lòng kiểm tra và cập nhật thường xuyên những thay đổi
                  trong Điều khoản mua bán trên Doppelherz Việt Nam để biết các
                  quyền và nghĩa vụ của mình.
                </p>
              }
            </div>
            <h2 className="text-lg font-bold mt-2 mb-3"> 2. Điều kiện sử dụng Doppelherz Việt Nam</h2>
            <div className="ml-[9px]">
              <ul className="list-disc ml-3">
                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Bạn phải đủ 18 tuổi và có năng lực hành vi dân sự theo quy
                      định của pháp luật để truy cập và thực hiện các giao dịch
                      mua hàng trên Doppelherz Việt Nam. Nếu không, bạn phải có sự
                      giám sát của cha mẹ hoặc người giám hộ hợp pháp khi đăng ký
                      tài khoản và/hoặc thực hiện giao dịch mua hàng.
                    </p>
                  </li>
                }

                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Để mua hàng, bạn cần đăng ký tài khoản với thông tin cá nhân
                      xác thực, sau đó chúng tôi sẽ cấp cho bạn một tài khoản để
                      sử dụng và mua hàng trên Doppelherz Việt Nam. Bạn cần cập
                      nhật thông tin cá nhân khi có thay đổi và tự bảo mật tài
                      khoản và mật khẩu của mình.
                    </p>
                  </li>
                }

                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Bạn có thể sẽ nhận được email quảng cáo, thông tin khuyến
                      mại hoặc thông tin về lịch sử giao dịch từ Doppelherz Việt
                      Nam sau khi đăng ký. Bạn có thể đăng ký nhận thông tin qua
                      các kênh khác nhau của Doppelherz Việt Nam như email, SMS
                      hoặc Zalo. Bạn có thể cập nhật kênh nhận thông tin hoặc từ
                      chối nhận thông tin của chúng tôi bằng cách đăng nhập và tùy
                      chỉnh trong tài khoản của mình trên Doppelherz Việt Nam.
                    </p>
                  </li>
                }

                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Bạn không được đăng tải các bình luận tiêu cực không có cơ
                      sở, các bình luận kích động bạo lực, chống phá nhà nước, các
                      bình luận miệt thị, phân biệt giới tính, quấy rối tình dục,
                      các bình luận vi phạm pháp luật, vi phạm thuần phong mỹ tục
                      của xã hội...
                    </p>
                  </li>
                }

                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Bạn không được xâm nhập trái phép cơ sở dữ liệu của
                      Doppelherz Việt Nam, không được xâm nhập vào tài khoản của
                      người khác, không được sử dụng các công cụ, phần mềm,
                      trojan, mã độc, virus để tấn công, chiếm quyền quản trị hoặc
                      đánh cắp dữ liệu từ Doppelherz Việt Nam.
                    </p>
                  </li>
                }

              </ul>
            </div>
            <h2 className="text-lg font-bold mt-2 mb-3">
              3. Nội dung đăng tải và bình luận của khách hàng
            </h2>

            <div className="ml-[9px]">
              <ul className="list-disc ml-3">
                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Tất cả những ý kiến, bình luận và nội dung do khách hàng
                      đăng tải trên Doppelherz Việt Nam đều là tài sản của
                      Doppelherz Việt Nam chúng tôi. Khi bạn đóng góp ý kiến, bình
                      luận và đăng tải nội dung trên Doppelherz Việt Nam, bạn đồng
                      ý cấp cho chúng tôi quyền sở hữu, sử dụng, sửa đổi, xóa bỏ,
                      ẩn hoặc đăng tải lại trên các phương tiện truyền thông mà
                      không cần xin phép hay báo trước.
                    </p>
                  </li>
                }
              </ul>
            </div>

            <h2 className="text-lg font-bold mt-2 mb-3">
              4. Xác nhận và hủy bỏ đơn hàng
            </h2>

            <div className="ml-[9px]">
              <ul className="list-disc ml-3">
                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Doppelherz Việt Nam sẽ luôn cung cấp thông tin về sản phẩm
                      và giá cả một cách chính xác nhất. Tuy nhiên, đôi khi thông
                      tin về sản phẩm và giá cả có thay đổi nhưng chưa kịp cập
                      nhật trên trang web hoặc có lỗi kỹ thuật nào đó khiến cho
                      thông tin sản phẩm và/hoặc giá sản phẩm bị sai lệch. Khi đó,
                      chúng tôi sẽ liên lạc để hướng dẫn bạn đặt hàng lại hoặc
                      thông báo hủy đơn hàng.
                    </p>
                  </li>
                }


                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Với bất kỳ lý do gì liên quan đến lỗi kỹ thuật hoặc lỗi hệ
                      thống, Doppelherz Việt Nam có quyền từ chối hoặc hủy đơn
                      hàng của quý khách sau khi thông báo trên Doppelherz Việt
                      Nam hoặc liên lạc trực tiếp khách hàng.
                    </p>
                  </li>
                }

                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li>
                    <p>
                      Khách hàng cũng có thể hủy đơn hàng đã đặt bằng cách gọi đến
                      số hotline <a href="tel:1800 1770" className="text-red-600 ">1800 1770</a> hoặc email <a href="mailto:info@mastertran.vn" className="text-red-500">info@mastertran.vn</a> để yêu
                      cầu hủy đơn hàng.
                    </p>
                  </li>
                }
              </ul>
            </div>
            <h2 className="text-lg font-bold mt-2 mb-3">
              5. Quyền sở hữu trí tuệ
            </h2>

            <div className="ml-[9px]">
              <ul className="list-disc ml-3">
                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Tất cả các quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng
                      ký bảo hộ) bao gồm nhưng không giới hạn: ý tưởng, sáng kiến,
                      bài viết, hình ảnh, âm thanh, nhạc, thiết kế, đồ họa, phần
                      mềm, biên dịch phần mềm, mã nguồn... trên Doppelherz Việt
                      Nam đều là tài sản trí tuệ của Doppelherz Việt Nam. Bạn có
                      quyền sử dụng các tài sản trí tuệ của Doppelherz Việt Nam
                      vào mục đích cá nhân và mang tính tích cực. Bạn không được
                      sao chép, sửa đổi, tái xuất bản một phần hay toàn bộ, truyền
                      tải, phân phối, cấp phép, tái sản xuất, bán hoặc dùng vào
                      mục đích thương mại các tài sản trí tuệ này trừ khi được sự
                      đồng ý bằng văn bản của Doppelherz Việt Nam.
                    </p>
                  </li>
                }
              </ul>
            </div>
            <h2 className="text-lg font-bold mt-2 mb-3">
              6. Bảo mật thông tin
            </h2>

            <div className="ml-[9px]">
              <ul className="list-disc ml-3">
                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Bạn vui lòng tham khảo Chính sách bảo mật thông tin của
                      Doppelherz Việt Nam {" "}
                      <Link href={"/baomat"}>
                        <a className="underline text-red-600">tại đây</a>
                      </Link>
                      .
                    </p>
                  </li>
                }
              </ul>
            </div>

            <h2 className="text-lg font-bold mt-2 mb-3">
              7. Giới hạn và miễn trừ trách nhiệm
            </h2>

            <div className="ml-[9px]">
              <ul className="list-disc ml-3">
                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Doppelherz Việt Nam được miễn trừ trách nhiệm và miễn trừ
                      bồi thường trong tất cả các trường hợp rò rỉ thông tin cá
                      nhân, thông tin thẻ tín dụng... xảy ra sự cố do lỗi đường
                      truyền, lỗi máy chủ, lỗi hệ thống tên miền, trang web bị mã
                      độc, virus, trojan, bị tấn công mạng, bị chiếm quyền quản
                      trị và do các lỗi kỹ thuật khách quan khác.
                    </p>
                  </li>
                }

                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Chúng tôi sẽ cố gắng hoàn thiện website Doppelherz Việt Nam
                      và nâng cao trải nghiệm người dùng đến mức tốt nhất có thể.
                      Tuy nhiên, bạn hiểu và đồng ý rằng các trường hợp không mong
                      muốn như: trải nghiệm người dùng chưa tốt, trang web không
                      thể truy cập, các thông tin sai lệch hoặc chưa cập nhật kịp
                      thời, các đơn hàng bị hủy, các đơn hàng bị chậm trễ giao
                      hàng và/hoặc các bất tiện khác (nếu có) trong quá trình sử
                      dụng Doppelherz Việt Nam của khách hàng sẽ không dẫn đến bất
                      kỳ nghĩa vụ bồi thường thiệt hại nào từ phía chúng tôi.
                    </p>
                  </li>
                }
              </ul>
            </div>
            <h2 className="text-lg font-bold mt-2 mb-3">
              8. Luật áp dụng và cơ quan giải quyết tranh chấp
            </h2>

            <div className="ml-[9px]">
              <ul className="list-disc ml-3">

                {
                  loading ? <Skeleton count={3}>
                    <p></p>
                  </Skeleton> : <li className="mb-3">
                    <p>
                      Điều Khoản Sử Dụng này xác lập giao kết hợp đồng giữa
                      Doppelherz Việt Nam và khách hàng sử dụng Doppelherz Việt
                      Nam. Giao kết hợp đồng này sẽ được điều chỉnh bởi luật pháp
                      Việt Nam với cơ quan giải quyết tranh chấp là Tòa án có thẩm
                      quyền theo quy định của pháp luật.
                    </p>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dieukhoan;
