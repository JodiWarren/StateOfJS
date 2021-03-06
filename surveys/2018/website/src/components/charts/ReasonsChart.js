import React, { Component, Fragment } from 'react'
import { reasons } from '../../constants'
import theme from '../../nivoTheme'
import BlockTitle from '../elements/BlockTitle'
import ReasonsChartUnit from './ReasonsChartUnit'
import { getToolName } from '../../helpers/wording'

export default class ReasonsChart extends Component {
    getData = () => {
        const { like, dislike } = this.props.reasons

        const dislikeData = reasons.dislike
            .map(reason => {
                const match = dislike.find(r => r.id === reason)

                return {
                    id: reason,
                    count: match !== undefined ? match.count : 0
                }
            })
            .filter(r => r.count > 0)
            .sort((a, b) => a.count - b.count)

        const likeData = reasons.like
            .map(reason => {
                const match = like.find(r => r.id === reason)

                return {
                    id: reason,
                    count: match !== undefined ? match.count : 0
                }
            })
            .filter(r => r.count > 0)
            .sort((a, b) => a.count - b.count)

        return { likeData, dislikeData }
    }

    render() {
        const { tool, chartIdLikes, chartIdDislikes } = this.props
        const { likeData, dislikeData } = this.getData()

        return (
            <Fragment>
                {likeData.length > 0 && (
                    <div className="Block Block--likes block" id={chartIdLikes}>
                        <BlockTitle chartId={chartIdLikes} values={{ tool: getToolName(tool) }} />
                        <ReasonsChartUnit data={likeData} color={theme.reasonsColors.like} />
                        <ReasonsChartUnit
                            data={likeData}
                            color={theme.reasonsColors.like}
                            variant="mobile"
                        />
                    </div>
                )}
                {dislikeData.length > 0 && (
                    <div className="Block Block--dislikes block" id={chartIdDislikes}>
                        <BlockTitle
                            chartId={chartIdDislikes}
                            values={{ tool: getToolName(tool) }}
                        />
                        <ReasonsChartUnit data={dislikeData} color={theme.reasonsColors.dislike} />
                        <ReasonsChartUnit
                            data={dislikeData}
                            color={theme.reasonsColors.dislike}
                            variant="mobile"
                        />
                    </div>
                )}
            </Fragment>
        )
    }
}
