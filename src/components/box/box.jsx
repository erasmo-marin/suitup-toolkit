import React from 'react';
import classnames from 'classnames';
import isArray from 'lodash/fp/isArray';
import forEach from 'lodash/forEach';
import Child from './boxChild';
import suitupable from '../component';

@suitupable(true, true)
class Box extends React.Component {
    constructor(props) {
        super(props);
    }

    setupChildProps(props) {
        if (props.children && props.columns) {
            let gutter = this.parseGutter(props.gutter);
            if (gutter && gutter.number) {
                gutter = gutter.number / 2 + gutter.measure;
            }

            if (isArray(props.children)) {
                return props.children.map(element => {
                    let wides = element.props.wides;
                    let wide;

                    if (wides && wides[this.props.screen]) {
                        wide = wides[this.props.screen];
                    } else {
                        wide = element.props.wide ? element.props.wide : 1;
                    }

                    return React.cloneElement(element, {
                        columns: props.columns,
                        gutter: gutter ? gutter : '0.5rem',
                        wide: wide,
                    });
                }, this);
            } else {
                return React.cloneElement(props.children, {
                    columns: props.columns,
                    gutter: gutter ? gutter : '0.5rem',
                });
            }
        } else {
            return props.children;
        }
    }

    parseGutter(gutter) {
        if (!gutter) return;

        let number = parseFloat(gutter);

        return {
            number: number,
            measure: gutter.replace(number, ''),
        };
    }

    render() {
        let {
            verticalExpand,
            horizontal,
            vertical,
            autoFill,
            centered,
            justify,
            align,
            children,
            columns,
            gutter,
            screen,
            style,
            settings,
            className,
            ...rest
        } = this.props;

        if (!gutter) {
            gutter = '0.5rem';
        }

        let classesObj = {
            box: true,
            horizontal: vertical == null ? true : false,
            vertical: vertical,
            'fill-space': autoFill,
            centered: justify == 'center',
            left: justify == 'left',
            right: justify == 'right',
            'align-start': align == 'start',
            'align-end': align == 'end',
            'align-center': align == 'center',
            'align-stretch': align == 'stretch',
            'align-baseline': align == 'baseline',
            'full-height': verticalExpand,
            [screen]: true,
        };

        if (className) {
            let propClasses = className.split(' ');
            forEach(propClasses, theClass => {
                classesObj[theClass] = true;
            });
        }

        let classes = classnames(classesObj);

        gutter = this.parseGutter(gutter);

        if (gutter && gutter.number) {
            gutter = (gutter.number / 2) * -1 + gutter.measure;
        }

        let cstyle = {
            marginLeft: gutter,
            marginRight: gutter,
        };

        return (
            <div {...rest} style={{ ...cstyle, ...style }} className={classes}>
                {this.setupChildProps(this.props)}
            </div>
        );
    }
}

Box.Child = Child;

export default Box;
