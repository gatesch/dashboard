/*
Copyright 2019 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import PipelineResourcesDropdown from './PipelineResourcesDropdown';

const props = {
  id: 'pipeline resources dropdown',
  onChange: action('onChange')
};

const pipelineResourcesByNamespace = {
  default: {
    default: 'id-default',
    'pipeline-resource-1': 'id-pipeline-resource-1',
    'pipeline-resource-2': 'id-pipeline-resource-2',
    'pipeline-resource-3': 'id-pipeline-resource-3'
  }
};

const pipelineResourcesById = {
  'id-default': {
    metadata: {
      name: 'default',
      namespace: 'default',
      uid: 'id-default'
    },
    spec: { type: 'type-1' }
  },
  'id-pipeline-resource-1': {
    metadata: {
      name: 'pipeline-resource-1',
      namespace: 'default',
      uid: 'id-pipeline-resource-1'
    },
    spec: { type: 'type-1' }
  },
  'id-pipeline-resource-2': {
    metadata: {
      name: 'pipeline-resource-2',
      namespace: 'default',
      uid: 'id-pipeline-resource-2'
    },
    spec: { type: 'type-2' }
  },
  'id-pipeline-resource-3': {
    metadata: {
      name: 'pipeline-resource-3',
      namespace: 'default',
      uid: 'id-pipeline-resource-3'
    },
    spec: { type: 'type-2' }
  }
};

const namespacesByName = {
  default: ''
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

storiesOf('Containers/Dropdowns/PipelineResourcesDropdown', module)
  .add('default', () => {
    const store = mockStore({
      pipelineResources: {
        byId: pipelineResourcesById,
        byNamespace: pipelineResourcesByNamespace,
        isFetching: false
      },
      namespaces: {
        byName: namespacesByName,
        selected: 'default'
      },
      notifications: {}
    });
    return (
      <Provider store={store}>
        <PipelineResourcesDropdown {...props} />
      </Provider>
    );
  })
  .add('default with type', () => {
    const store = mockStore({
      pipelineResources: {
        byId: pipelineResourcesById,
        byNamespace: pipelineResourcesByNamespace,
        isFetching: false
      },
      namespaces: {
        byName: namespacesByName,
        selected: 'default'
      },
      notifications: {}
    });
    return (
      <Provider store={store}>
        <PipelineResourcesDropdown {...props} type="type-1" />
      </Provider>
    );
  })
  .add('empty', () => {
    const store = mockStore({
      pipelineResources: {
        byId: {},
        byNamespace: {},
        isFetching: false
      },
      namespaces: {
        byName: namespacesByName,
        selected: 'default'
      },
      notifications: {}
    });
    return (
      <Provider store={store}>
        <PipelineResourcesDropdown {...props} />
      </Provider>
    );
  })
  .add('empty with type', () => {
    const store = mockStore({
      pipelineResources: {
        byId: {},
        byNamespace: {},
        isFetching: false
      },
      namespaces: {
        byName: namespacesByName,
        selected: 'default'
      },
      notifications: {}
    });
    return (
      <Provider store={store}>
        <PipelineResourcesDropdown {...props} type="bogus" />
      </Provider>
    );
  });
