// import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import PomodoroTimer, { PomodoroInfo } from './PomodoroTimer'
import NotionKeySetter from './NotionKeySetter'

export default function Pomodoro() {
  // const { data: session } = useSession();
  // const allPomodoroInfos: any[] = [];

  const [isKeySet, setIsKeySet] = React.useState(false)
  const [todayInfo, setTodayInfo] = React.useState<
    PomodoroInfo | null | undefined
  >(null)
  // const [pomodoroInfos, setPomodoroInfos] =
  //   React.useState<PomodoroInfo[]>(allPomodoroInfos);

  // React.useEffect(() => {
  //   const today = dayjs().format('YYYY-MM-DD');
  //   const found = pomodoroInfos.find((info) => info.date === today);
  //   setTodayInfo(found);
  // }, [pomodoroInfos]);

  // React.useEffect(() => {
  //   if (!todayInfo) return;

  //   const idx = pomodoroInfos.findIndex(
  //     (info) => info.date === todayInfo?.date,
  //   );

  //   if (idx !== -1) {
  //     const newPomodoroInfos = [...pomodoroInfos];
  //     newPomodoroInfos[idx] = todayInfo;
  //     setPomodoroInfos(newPomodoroInfos);
  //   } else {
  //     setPomodoroInfos([...pomodoroInfos, todayInfo]);
  //   }
  // }, [pomodoroInfos, todayInfo]);

  function showGuide() {
    alert(`🍅 사용 가이드 🍅`)
  }

  useEffect(() => {
    const { NOTION_KEY, NOTION_POMODORO_DATABASE_ID } = window.electron

    if (NOTION_KEY && NOTION_POMODORO_DATABASE_ID) {
      localStorage.setItem('notion_key', NOTION_KEY)
      localStorage.setItem(
        'notion_pomodoro_database_id',
        NOTION_POMODORO_DATABASE_ID,
      )
      window.electron.ipcRenderer.sendMessage('set_notion_keys', {
        NOTION_KEY,
        NOTION_POMODORO_DATABASE_ID,
      })
      setIsKeySet(true)
    }
    // const notionKey = localStorage.getItem('notion_key')
    // const notionPomodoroDatabaseId = localStorage.getItem(
    //   'notion_pomodoro_database_id',
    // )

    // if (notionKey && notionPomodoroDatabaseId) {
    //   window.electron.ipcRenderer.sendMessage('set_notion_keys', [
    //     notionKey,
    //     notionPomodoroDatabaseId,
    //   ])
    // }

    // window.electron.ipcRenderer.send('pomodoro:ready')
    // window.electron.ipcRenderer.on('pomodoro:ready', () => {
    //   window.electron.ipcRenderer.send('pomodoro:load')
    // })
    // window.electron.ipcRenderer.on(
    //   'pomodoro:load',
    //   (event: any, pomodoroInfos: PomodoroInfo[]) => {
    //     // setPomodoroInfos(pomodoroInfos);
    //     const today = new Date().toLocaleDateString()
    //     const found = pomodoroInfos.find((info) => info.date === today)
    //     setTodayInfo(found)
    //   },
    // )
  }, [])

  function resetKeys() {
    localStorage.removeItem('notion_key')
    localStorage.removeItem('notion_pomodoro_database_id')
    setIsKeySet(false)
  }

  return isKeySet ? (
    <>
      <div style={{ paddingTop: '1px' }}>
        <PomodoroTimer todayInfo={todayInfo} setTodayInfo={setTodayInfo} />

        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ wimdth: '70%' }}>
                          <CalendarHeatmap
                              startDate={new Date('2023-04-30')}
                              endDate={new Date('2023-08-01')}
                              onClick={(value: any) => {
                                  if (!value || !isYoung) return

                                  alert(`${value.date}  🍅 * ${value.count}`)
                              }}
                              classForValue={(value: any) => {
                                  let selectorNumber = 0
                                  if (!value || value.count === 0) {
                                  } else if (value.count > 8) {
                                      selectorNumber = 4
                                  } else if (value.count > 6) {
                                      selectorNumber = 3
                                  } else if (value.count > 4) {
                                      selectorNumber = 2
                                  } else if (value.count > 0) {
                                      selectorNumber = 1
                                  }

                                  return `color-github-${selectorNumber}`
                              }}
                              values={pomodoroInfos}
                          />
                      </div>
                  </div> */}
      </div>
      <div className="bottom_btns">
        <button
          type="button"
          className="bottom_btn"
          onClick={() => {
            if (window.confirm('노션 key를 초기화하시겠습니까?')) {
              resetKeys()
            }
          }}
          style={{ marginRight: 10 }}
        >
          notion key 재설정 ✏️
        </button>
        <button
          type="button"
          className="bottom_btn"
          onClick={showGuide}
          style={{ borderRadius: '100%' }}
        >
          ?
        </button>
      </div>
    </>
  ) : (
    <>
      <NotionKeySetter setIsKeySet={setIsKeySet} />
      <div className="bottom_btns">
        <button
          type="button"
          className="bottom_btn"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('set_notion_keys', {
              NOTION_KEY: '',
              NOTION_POMODORO_DATABASE_ID: '',
            })
            setIsKeySet(true)
          }}
          style={{ marginRight: 10 }}
        >
          그냥 쓰기
        </button>
        <button
          type="button"
          className="bottom_btn"
          onClick={showGuide}
          style={{ borderRadius: '100%' }}
        >
          ?
        </button>
      </div>
    </>
  )
}
