/**
 * 파일명 : DateUtils.ts
 * 설명   : 페이지 설명
 * 변경이력 :
 * ====================================================
 *     일자      작성자       설명
 * ====================================================
 *  2024-00-00   김단호       최초작성
 */
export default class DateUtils {
  /**
   * 날짜 형식을 "yyyy-MM-dd"로 출력
   * @param date Date 객체
   * @param delimiter 구분자(기본값: "-")
   * @returns "yyyy-MM-dd"
   */
  public static toString(date: Date, delimiter: String = "-"): String {
    return (
      date.getFullYear().toString() +
      delimiter +
      (date.getMonth() + 1) +
      delimiter +
      date.getDate()
    )
  }

  /**
   * 날짜 형식을 "yyyy-MM-dd"로 출력
   *
   * @param year 년
   * @param month 월
   * @param day 일
   * @param delimiter 구분자(기본값: "-")
   * @returns "yyyy-MM-dd"
   */
  public static toString2(
    year: number,
    month: number,
    day: number,
    delimiter: String = "-"
  ): String {
    return (
      year.toString() +
      delimiter +
      month.toString().padStart(2, "0") +
      delimiter +
      day.toString().padStart(2, "0")
    )
  }

  /**
   * Date 객체를 별도의 객체로 치환한다.
   * @param date Date 객체
   * @returns {년, 월, 일}
   */
  public static toInstance(date: Date): {
    year: number
    month: number
    day: number
  } {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }
  }
}
