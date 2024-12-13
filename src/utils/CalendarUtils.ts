/**
 * 파일명 : CalendarUtils.ts
 * 설명   : 캘린더 화면에서 사용하는 유틸 모음.
 * 변경이력 :
 * ====================================================
 *     일자      작성자       설명
 * ====================================================
 *  2024-12-13   김단호       최초작성
 */
import DateUtils from "@/utils/DateUtils"

// 월단위 정보
interface Month {
  year: number
  month: number
  firstDay: number
  firstDow: number
  lastDay: number
  lastDow: number
}

export default class CalendarUtils {
  /**
   *  로직 상 연도가 바뀌는 것을 대비하여 적절한 날짜 계산한다.
   * @param _year
   * @param _month
   * @returns
   */
  public static getMonthInfo(_year: number, _month: number): Month {
    let year = this.getYear(_year, _month)
    let month = this.getMonth(_month)

    return {
      year: year,
      month: month,
      firstDay: 1,
      firstDow: new Date(year, month - 1, 1).getDay(),
      lastDay: new Date(year, month, 0).getDate(),
      lastDow: new Date(year, month, 0).getDay(),
    }
  }

  /**
   * 로직 상 연도가 바뀌는 것을 대비하여 적절한 연도를 계산한다.
   * @param _year 현재 연도
   * @param _month 0 ~ 13
   * @returns 작년/올해/내년
   */
  private static getYear(_year: number, _month: number): number {
    let year = _year
    if (_month < 1) {
      year -= 1
    } else if (_month > 12) {
      year += 1
    }
    return year
  }

  /**
   * 로직 상 연도가 바뀌는 것을 대비하여 적절한 월을 계산한다.
   * @param _month -11 ~ 24
   * @returns 1 ~ 12
   */
  private static getMonth(_month: number): number {
    // -11 ~ 0 (1~12)
    // 1 ~ 12
    // 13 ~ (1~12)
    let month = _month % 12
    return month > 0 ? month : month + 12
  }

  /**
   * 날짜 형식을 "yyyy-MM-dd"로 출력
   * @param date Date 객체
   * @param delimiter 구분자(기본값: "-")
   * @returns "yyyy-MM-dd"
   */
  public static toString(date: Date, delimiter: String): String {
    return delimiter == undefined
      ? DateUtils.toString(date)
      : DateUtils.toString(date, delimiter)
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
    return DateUtils.toInstance(date)
  }
}
