import IsConnected from 'lib/isConnected'

export default function evenements () {
  return <>{IsConnected() && <div>ici la list des evenements</div>}</>
}
