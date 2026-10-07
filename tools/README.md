# tools/

핸드북 유지보수용 스크립트입니다. 교재 본문(ko/en 챕터·워크시트·사례)은 수정하지 않습니다. 모든 스크립트는 저장소 루트를 자동으로 찾으므로 어느 위치에서 실행해도 됩니다.

| 스크립트 | 용도 | 실행 |
|---|---|---|
| `gen_pricing2.mjs` → `gen_pricing3.mjs` | 다이어그램 8종 SVG(KO/EN)를 `assets/images`에 생성합니다. 반드시 2번 다음 3번 순서로 실행하며, 현재 산출물과 동일하게 재현됩니다. | `node tools/gen_pricing2.mjs && node tools/gen_pricing3.mjs` |
| `verify_specs.py` | `site/diagrams/specs`의 spec 라벨이 SVG에 있는지, 인용 문구가 한국어 본문에 있는지 대조합니다. 읽기 전용입니다. | `python tools/verify_specs.py` |
| `ptest.cjs` | 워크시트 작성기의 파싱→직렬화 왕복 테스트입니다. 형제 폴더 `../business-planning-handbook`이 있으면 함께 쓸 수 있습니다. | `node tools/ptest.cjs` |
| `qa_summary_test.cjs` | 워크시트 작성기의 "답변만 정리"(`summarize`)를 30개 워크시트 전체로 검증합니다. 비어 있으면 "답변 없음", 모든 칸을 채우면 입력값이 빠짐·중복 없이 나오는지, 한 칸만 채우면 질문·답변 묶음이 정확히 하나인지 확인합니다. | `node tools/qa_summary_test.cjs` |
| `en_ws_audit.py` | `en/manual/CHnn-worksheet.md` 15개의 한글 잔존, 금지 문자열, KO/EN 구조 대응을 감사합니다. 읽기 전용입니다. | `python tools/en_ws_audit.py` |

## 참고
- 옛 `gen_pricing.mjs`는 CH03·CH06을 옛 디자인으로 덮어쓰므로 포함하지 않았습니다.
- spec 생성용 일회성 패치 스크립트는 재실행하면 이미 적용된 변경 때문에 실패하거나 spec을 옛 내용으로 되돌리므로 포함하지 않았습니다. 현재 spec은 `site/diagrams/specs`의 파일이 기준입니다.
- Windows 콘솔에서 `.py` 출력이 깨지면 `PYTHONIOENCODING=utf8`을 지정하세요.
- `ptest.cjs`는 표 빈 셀 공백 차이로 6건의 왕복 불일치를 보고합니다. 출력 내용에는 영향이 없는 기존 차이입니다.
- 작성기 출력(`serialize`)에는 로케일별 라벨(`answerLabel`)이 적용되어 있습니다.
- `en_ws_audit.py`의 금지 문자열 검사는 환경변수로 받습니다: `BLOCKED_TERMS="용어1|용어2" python tools/en_ws_audit.py` (미지정이면 검사하지 않음).
